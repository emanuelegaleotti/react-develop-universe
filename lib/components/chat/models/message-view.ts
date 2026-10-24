/**
 *
 * @export
 * @interface MessageView
 */
export interface MessageView {
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'messageId': string;
    /**
     *
     * @type {number}
     * @memberof MessageView
     */
    'id': number;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'correlationId': string | null;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'content': string;
    /**
     *
     * @type {number}
     * @memberof MessageView
     */
    'progressive': number;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'source': string;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'reaction': string | null;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'comment': string | null;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'createdAt': string;
    /**
     *
     * @type {string}
     * @memberof MessageView
     */
    'updatedAt': string;
}