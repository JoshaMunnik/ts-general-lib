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

import {UFQueueableAction} from "./UFQueueableAction.js";
import {IUFCancellationToken} from "./IUFCancellationToken.js";

// endregion

// region exports

/**
 * A simple action that waits a certain time before finishing.
 */
export class UFDelayAction extends UFQueueableAction {
  // region private variables

  /**
   * Delay to wait.
   *
   * @private
   */
  private readonly m_delay: number;

  /**
   * See {@link progress}
   *
   * @private
   */
  private m_progress: number = 0.0;


  // endregion

  // region public methods

  /**
   * Constructs an instance of {@link UFDelayAction}.
   *
   * @param aDelay
   *   Delay in milliseconds
   */
  constructor(aDelay: number) {
    super();
    this.m_delay = aDelay;
  }

  // endregion

  // region UFQueueableAction

  /**
   * @inheritDoc
   */
  run(aToken: IUFCancellationToken): Promise<boolean> {
    this.m_progress = 0.0;
    return new Promise(
      resolve => setTimeout(
        () => {
          this.m_progress = 1.0;
          resolve(true)
        },
        this.m_delay
      )
    );
  }

  // endregion

  // region IUFProgress

  /**
   * @inheritDoc
   */
  get progress(): number {
    return this.m_progress;
  }

  // endregion
}

// endregion