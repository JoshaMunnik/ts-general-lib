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
import { UFParallelQueueAction } from "./UFParallelQueueAction.js";
import { IUFQueueableAction } from "./IUFQueueableAction.js";
/**
 * {@link UFSerialQueueAction} can be used to run one or more {@link IUFQueueableAction} sequentially.
 *
 * The class is a subclass of {@link UFParallelQueueAction} using a concurrent count of 1 (so only one action
 * is ran at the time).
 */
export declare class UFSerialQueueAction extends UFParallelQueueAction {
    /**
     * Constructs an instance of {@link UFSerialQueueAction}.
     *
     * @param actions
     *   One or more actions to run.
     */
    constructor(...actions: IUFQueueableAction[]);
    /**
     * Gets the current running action or null if there is none.
     */
    get currentAction(): IUFQueueableAction | null;
}
