/**
 * @version 1
 * @author Josha Munnik
 * @copyright Copyright (c) 2022 Ultra Force Development
 * @license
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * <ul>
 * <li>Redistributions of source code must retain the above copyright notice, this list of conditions and
 *     the following disclaimer.</li>
 * <li>The authors and companies name may not be used to endorse or promote products derived from this
 *     software without specific prior written permission.</li>
 * </ul>
 * <br/>
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
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
import { UFQueueableAction } from "./UFQueueableAction";
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
     * @param aCallback
     *   Callback to call when the action is run.
     */
    constructor(aCallback) {
        super();
        /**
         * See {@link progress}
         *
         * @private
         */
        this.m_progress = 0.0;
        this.m_callback = aCallback;
    }
    // endregion
    // region IUFQueueableAction
    /**
     * @inheritDoc
     */
    run(aToken) {
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