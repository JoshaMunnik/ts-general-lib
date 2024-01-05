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
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS´´ AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */
import { IUFCancellationToken } from "./IUFCancellationToken";
/**
 * {@link UFCancellationTokenSource} can be used to get a {@link IUFCancellationToken}. The token can be activated by
 * calling the {@link cancel} method.
 *
 * It is possible to link tokens together by supplying other {@link IUFCancellationToken} instances with the
 * constructor.
 *
 * The naming is based on the .net (c#) implementation.
 */
export declare class UFCancellationTokenSource implements IUFCancellationToken {
    /**
     * See {@link isCancellationRequested}
     *
     * @private
     */
    private m_cancel;
    /**
     * Other tokens to track
     *
     * @private
     */
    private readonly m_otherTokens;
    /**
     * Constructs an instance of {@link UFCancellationTokenSource}
     *
     * @param anOtherTokens
     *   Tokens to include when checking if the token is cancelled.
     *
     * @constructor
     */
    constructor(...anOtherTokens: IUFCancellationToken[]);
    /**
     * Sets the state to cancel.
     */
    cancel(): void;
    /**
     * Gets a reference to the token, which can be used to check if a cancellation has been requested through
     * {@link cancel}.
     */
    get token(): IUFCancellationToken;
    /**
     * A token that will never be cancelled (readonly constant).
     */
    static get NONE(): IUFCancellationToken;
    /**
     * Checks if a call was made to {@link cancel} or if one of the other tokens supplied with the constructor is
     * requesting cancellation.
     */
    get isCancellationRequested(): boolean;
}
