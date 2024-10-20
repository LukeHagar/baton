// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {

		/**
   * Represents an error according to the RFC 7807 `application/problem+json` standard.
   * @see https://datatracker.ietf.org/doc/html/rfc7807
   */
		interface Error {
			/**
			 * A URI reference that identifies the problem type.
			 * This URI should ideally point to human-readable documentation.
			 * @example "https://example.com/probs/out-of-stock"
			 */
			type?: string;
		
			/**
			 * A short, human-readable summary of the problem.
			 * @example "Out of Stock"
			 */
			title?: string;
		
			/**
			 * The HTTP status code associated with the problem.
			 * @example 404
			 */
			status?: number;
		
			/**
			 * A detailed, human-readable explanation of the problem.
			 * @example "The requested item is no longer available."
			 */
			detail?: string;
		
			/**
			 * A URI reference that identifies the specific occurrence of the problem.
			 * This can be used for tracking and debugging.
			 * @example "/products/12345"
			 */
			instance?: string;
		
			/**
			 * Additional fields providing extra information about the problem.
			 * @remarks Use `unknown` to ensure type safety when accessing these fields.
			 */
			[key: string]: unknown;
		}
		
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
