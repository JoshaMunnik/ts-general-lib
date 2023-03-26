// region imports

import {UFQueueableAction} from "../../src/UF/actions/UFQueueableAction";
import {IUFCancellationToken} from "../../src/UF/actions/IUFCancellationToken";

// endregion

// region exports

/**
 * A simple action that waits a certain time before finishing.
 */
export class DelayedCallbackAction extends UFQueueableAction {
  // region private variables

  private readonly m_delay: number;

  private readonly m_beforeCallback: () => any;

  private readonly m_afterCallback: () => any;

  private m_progress: number = 0.0;

  private readonly m_progressWeight: number;

  // region public methods

  constructor(aDelay: number, aBeforeCallback: () => any, anAfterCallback: () => any, aWeight: number = 1.0) {
    super();
    this.m_delay = aDelay;
    this.m_beforeCallback = aBeforeCallback;
    this.m_afterCallback = anAfterCallback;
    this.m_progressWeight = aWeight;
  }

  // endregion

  // region UFQueueableAction

  /**
   * @inheritDoc
   */
  run(aToken: IUFCancellationToken): Promise<boolean> {
    this.m_progress = 0.0;
    this.m_beforeCallback();
    return new Promise(
      resolve => setTimeout(
        () => {
          this.m_progress = 1.0;
          this.m_afterCallback();
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

  // region IUFWeightedProgress

  get progressWeight(): number {
    return this.m_progressWeight;
  }

  // endregion
}

// endregion