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
 * A simple action to call a callback when run.
 */
export class UFCallbackAction extends UFQueueableAction {
  // region private variables

  /**
   * Callback to run
   *
   * @private
   */
  private readonly m_callback: () => any;

  /**
   * See {@link progress}
   *
   * @private
   */
  private m_progress: number = 0.0;

  // endregion

  // region public methods

  /**
   * Constructs an instance of {@link UFCallbackAction}.
   *
   * @param aCallback
   *   Callback to call when the action is run.
   */
  constructor(aCallback: () => any) {
    super();
    this.m_callback = aCallback;
  }

  // endregion

  // region IUFQueueableAction

  /**
   * @inheritDoc
   */
  async run(aToken: IUFCancellationToken): Promise<boolean> {
    this.m_progress = 0.0;
    this.m_callback();
    this.m_progress = 1.0;
    return Promise.resolve(true);
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