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
import { UFQueueableAction } from "./UFQueueableAction.js";
import { IUFCancellationToken } from "./IUFCancellationToken.js";
/**
 * A simple action to call a callback when run.
 */
export declare class UFCallbackAction extends UFQueueableAction {
    /**
     * Callback to run
     *
     * @private
     */
    private readonly m_callback;
    /**
     * See {@link progress}
     *
     * @private
     */
    private m_progress;
    /**
     * Constructs an instance of {@link UFCallbackAction}.
     *
     * @param callback
     *   Callback to call when the action is run.
     */
    constructor(callback: () => any);
    /**
     * @inheritDoc
     */
    run(token: IUFCancellationToken): Promise<boolean>;
    /**
     * @inheritDoc
     */
    get progress(): number;
}
