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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// region imports
import { UFQueueableAction } from "./UFQueueableAction.js";
// endregion
// region exports
/**
 * A simple action to call a callback when run.
 */
export class UFCallbackAction extends UFQueueableAction {
    // endregion
    // region public methods
    /**
     * Constructs an instance of {@link UFCallbackAction}.
     *
     * @param callback
     *   Callback to call when the action is run.
     */
    constructor(callback) {
        super();
        /**
         * See {@link progress}
         *
         * @private
         */
        this.m_progress = 0.0;
        this.m_callback = callback;
    }
    // endregion
    // region IUFQueueableAction
    /**
     * @inheritDoc
     */
    run(token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_progress = 0.0;
            this.m_callback();
            this.m_progress = 1.0;
            return Promise.resolve(true);
        });
    }
    // endregion
    // region IUFProgress
    /**
     * @inheritDoc
     */
    get progress() {
        return this.m_progress;
    }
}
// endregion
//# sourceMappingURL=UFCallbackAction.js.map