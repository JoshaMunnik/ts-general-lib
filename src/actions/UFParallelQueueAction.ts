/**
 * @author Josha Munnik
 * @copyright Copyright (c) 2022 Ultra Force Development
 * @license
 * MIT License
 *
 * Copyright (c) 2022 Josha Munnik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// region imports

import {IUFQueueableAction} from "./IUFQueueableAction.js";
import {UFQueueableAction} from "./UFQueueableAction.js";
import {IUFCancellationToken} from "./IUFCancellationToken.js";
import {UFProgressTools} from "../tools/UFProgressTools.js";
import {UFCancellationTokenSource} from "./UFCancellationTokenSource.js";
import {UFText} from "../tools/UFText.js";

// endregion

// region exports

/**
 * {@link UFParallelQueueAction} implements an action queue that can run a number of {@link IUFQueueableAction} actions
 * at the same time.
 *
 * The class extends {@link UFQueueableAction} so the queue can be placed into other queues if needed.
 */
export class UFParallelQueueAction extends UFQueueableAction {
  // region private vars

  /**
   * Actions list
   *
   * @private
   */
  private readonly m_actions: IUFQueueableAction[];

  /**
   * Current promises being resolved.
   *
   * Since `Promise.race` does return the result of a promise, store the promises together with the index of
   * the action. The promise should return the same index value, so it can be removed from the map once it has finished.
   *
   * @private
   */
  private readonly m_activePromises: Map<number, Promise<number>> = new Map();

  /**
   * Maximum number of actions to run concurrently.
   *
   * @private
   */
  private readonly m_concurrentCount: number;

  /**
   * Total progress weight of all actions.
   *
   * @private
   */
  private readonly m_totalProgressWeight: number;

  /**
   * Sum of progress weight of all actions that have finished.
   *
   * @private
   */
  private m_doneProgressWeight: number = 0.0;

  /**
   * Points to the current action being processed
   *
   * @private
   */
  private m_actionIndex: number = 0;

  /**
   * Combines the error messages generated by the actions.
   *
   * @private
   */
  private m_errorMessage: string = '';

  // endregion

  // region public methods

  /**
   * Constructs an instance of {@link UFParallelQueueAction} that will run a certain number of {@link UFQueueableAction}
   * at the same time.
   *
   * @param aConcurrentCount
   *   Maximum number of actions that should run at the same time.
   * @param anActions
   *   One or more actions to run
   */
  constructor(aConcurrentCount: number, ...anActions: IUFQueueableAction[]) {
    super();
    this.m_actions = anActions;
    this.m_concurrentCount = aConcurrentCount;
    this.m_totalProgressWeight = anActions.reduce(
      (previous, current) => previous + UFProgressTools.getProgressWeight(current),
      0
    );
  }

  /**
   * Runs all stored actions at the same time.
   *
   * If the queue is already running, the method just returns true.
   *
   * @param aToken
   *   Token that can be cancelled to stop running.
   *
   * @return true if all actions run successful; false if one of the actions returned false or the token was cancelled.
   *
   * @throws an error if one or more actions threw an error.
   */
  public async run(aToken: IUFCancellationToken): Promise<boolean> {
    if (this.running) {
      return true;
    }
    this.m_doneProgressWeight = 0.0;
    this.m_actionIndex = 0;
    this.m_errorMessage = '';
    const tokenSource = new UFCancellationTokenSource(aToken);
    await this.runActions(tokenSource);
    // success if no task did cancel or threw an exception
    const result: boolean = !tokenSource.isCancellationRequested;
    // throw an exception if one or more actions threw an exception
    if (this.m_errorMessage.length) {
      throw new Error(`One or more actions raised an error: ${this.m_errorMessage}`);
    }
    return result;
  }

  /**
   * Gets all current running actions.
   */
  getRunningActions(): IUFQueueableAction[] {
    const result: IUFQueueableAction[] = [];
    this.m_activePromises.forEach((promise, index) => {
      result.push(this.m_actions[index]);
    });
    return result;
  }

  // endregion

  // region public properties

  /**
   * True if the queue still has at least one running action.
   */
  public get running(): boolean {
    return this.m_activePromises.size > 0;
  }

  /**
   * Number of running actions.
   */
  public get runningCount(): number {
    return this.m_activePromises.size;
  }

  // endregion

  // region IUFProgress

  /**
   * Gets the progress, include the progress of any running action.
   */
  public get progress(): number {
    let progressSum: number = 0;
    this.m_activePromises.forEach((value, index) => {
      const action = this.m_actions[index];
      progressSum += UFProgressTools.getProgressWeight(action) * UFProgressTools.getProgress(action);
    });
    return (progressSum + this.m_doneProgressWeight) / this.m_totalProgressWeight;
  }

  // endregion

  // region private methods

  /**
   * Starts running actions until all actions have finished running or the token is requesting cancellation.
   *
   * @param aTokenSource
   *   Will be cancelled if an action returned false or generated an error.
   *
   * @private
   */
  private async runActions(aTokenSource: UFCancellationTokenSource): Promise<void> {
    // keep looping if there are actions that still can be added or if there are any active actions still running
    while (
      (!aTokenSource.isCancellationRequested && (this.m_actionIndex < this.m_actions.length)) ||
      (this.m_activePromises.size > 0)
      ) {
      this.addPromises(aTokenSource);
      await this.waitForPromiseToFinish();
    }
  }

  /**
   * Waits for one of the active promises to resolve. The resolved promise will be removed from the active promises
   * list.
   *
   * @private
   */
  private async waitForPromiseToFinish() {
    const index = await Promise.race(Array.from(this.m_activePromises.values()));
    this.m_activePromises.delete(index);
  }

  /**
   * Keep adding promises from {@link runAction} to the active list until the concurrent maximum is reached or there are
   * no more actions or the token is requesting a cancellation.
   *
   * @param aTokenSource
   */
  private addPromises(aTokenSource: UFCancellationTokenSource) {
    while (
      !aTokenSource.isCancellationRequested
      && (this.m_actionIndex < this.m_actions.length)
      && (this.m_activePromises.size < this.m_concurrentCount)
      ) {
      this.m_activePromises.set(
        this.m_actionIndex, this.runAction(this.m_actionIndex, aTokenSource)
      );
      this.m_actionIndex++;
    }
  }

  /**
   * Runs an action. If the action returned false or threw an exception, call cancel on the token source.
   *
   * The returned promise will always resolve and never reject.
   *
   * @param anIndex
   *   Index to running action
   * @param aTokenSource
   *   Token source that will be cancelled if an error occurred or action returned false.
   *
   * @return a promise that will return the index of the action (same value as anIndex)
   *
   * @private
   */
  private async runAction(anIndex: number, aTokenSource: UFCancellationTokenSource): Promise<number> {
    const action = this.m_actions[anIndex];
    let actionResult: boolean;
    try {
      actionResult = await action.run(aTokenSource.token);
    } catch (error: any) {
      // an error results in a running failure
      actionResult = false;
      this.m_errorMessage = UFText.append(this.m_errorMessage, `${error.name}: ${error.message}`, ',');
    }
    // request cancellation if the action did not run successful
    if (!actionResult) {
      aTokenSource.cancel();
    }
    else {
      this.m_doneProgressWeight += UFProgressTools.getProgressWeight(action);
    }
    return anIndex;
  }

  // endregion
}

// endregion