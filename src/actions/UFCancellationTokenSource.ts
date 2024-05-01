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

import {IUFCancellationToken} from "./IUFCancellationToken.js";

// endregion

// region local

/**
 * A token implementation that always return false.
 */
const neverCancelledToken: IUFCancellationToken = {
  get isCancellationRequested() {
    return false;
  }
}

// endregion

// region exports

/**
 * {@link UFCancellationTokenSource} can be used to get a {@link IUFCancellationToken}. The token can be activated by
 * calling the {@link cancel} method.
 *
 * It is possible to link tokens together by supplying other {@link IUFCancellationToken} instances with the
 * constructor.
 *
 * The naming is based on the .net (c#) implementation.
 */
export class UFCancellationTokenSource implements IUFCancellationToken {
  // region private variables

  /**
   * See {@link isCancellationRequested}
   *
   * @private
   */
  private m_cancel: boolean;

  /**
   * Other tokens to track
   *
   * @private
   */
  private readonly m_otherTokens: IUFCancellationToken[];

  // endregion

  // region public methods

  /**
   * Constructs an instance of {@link UFCancellationTokenSource}
   *
   * @param anOtherTokens
   *   Tokens to include when checking if the token is cancelled.
   *
   * @constructor
   */
  constructor(...anOtherTokens: IUFCancellationToken[]) {
    this.m_cancel = false;
    this.m_otherTokens = anOtherTokens;
  }

  /**
   * Sets the state to cancel.
   */
  cancel() {
    this.m_cancel = true;
  }

  // endregion

  // region public properties

  /**
   * Gets a reference to the token, which can be used to check if a cancellation has been requested through
   * {@link cancel}.
   */
  get token(): IUFCancellationToken {
    return this;
  }

  /**
   * A token that will never be cancelled (readonly constant).
   */
  static get NONE(): IUFCancellationToken {
    return neverCancelledToken;
  }

  // endregion

  // region IUFCancellationToken

  /**
   * Checks if a call was made to {@link cancel} or if one of the other tokens supplied with the constructor is
   * requesting cancellation.
   */
  get isCancellationRequested(): boolean {
    return this.m_cancel || !!this.m_otherTokens.find(token => token.isCancellationRequested);
  }

  // endregion
}

// endregion