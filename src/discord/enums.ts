import type { PseudoEnum } from '../util.ts';

export type InteractionType = PseudoEnum<typeof InteractionType>;
/**
 * The type of interaction this request is.
 */
export const InteractionType = Object.freeze({
	/**
	 * A ping.
	 */
	PING: 1,
	/**
	 * A command invocation.
	 */
	APPLICATION_COMMAND: 2,
	/**
	 * Usage of a message's component.
	 */
	MESSAGE_COMPONENT: 3,
	/**
	 * An interaction sent when an application command option is filled out.
	 */
	APPLICATION_COMMAND_AUTOCOMPLETE: 4,
	/**
	 * An interaction sent when a modal is submitted.
	 */
	MODAL_SUBMIT: 5,
});

export type InteractionResponseType = PseudoEnum<typeof InteractionResponseType>;
/**
 * The type of response that is being sent.
 */
export const InteractionResponseType = Object.freeze({
	/**
	 * Acknowledge a `PING`.
	 */
	PONG: 1,
	/**
	 * Respond with a message, showing the user's input.
	 */
	CHANNEL_MESSAGE_WITH_SOURCE: 4,
	/**
	 * Acknowledge a command without sending a message, showing the user's input. Requires follow-up.
	 */
	DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
	/**
	 * Acknowledge an interaction and edit the original message that contains the component later; the user does not see a loading state.
	 */
	DEFERRED_UPDATE_MESSAGE: 6,
	/**
	 * Edit the message the component was attached to.
	 */
	UPDATE_MESSAGE: 7,
	/*
	 * Callback for an app to define the results to the user.
	 */
	APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
	/*
	 * Respond with a modal.
	 */
	MODAL: 9,
	/*
	 * Respond with an upgrade prompt.
	 */
	PREMIUM_REQUIRED: 10,

	/**
	 * Launch an Activity.
	 */
	LAUNCH_ACTIVITY: 12,
});

