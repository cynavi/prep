declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"core/autoboxing-and-unboxing.md": {
	id: "core/autoboxing-and-unboxing.md";
  slug: "core/autoboxing-and-unboxing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/avoid-using-wildcard-import.md": {
	id: "core/avoid-using-wildcard-import.md";
  slug: "core/avoid-using-wildcard-import";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/collections/fail-fast-vs-fail-safe.md": {
	id: "core/collections/fail-fast-vs-fail-safe.md";
  slug: "core/collections/fail-fast-vs-fail-safe";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/collections/hashset-internal-working.md": {
	id: "core/collections/hashset-internal-working.md";
  slug: "core/collections/hashset-internal-working";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/deep-copy-vs-shallow-copy.md": {
	id: "core/deep-copy-vs-shallow-copy.md";
  slug: "core/deep-copy-vs-shallow-copy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/errors-vs-exceptions.md": {
	id: "core/errors-vs-exceptions.md";
  slug: "core/errors-vs-exceptions";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/generics/bounded-type-parameters.md": {
	id: "core/generics/bounded-type-parameters.md";
  slug: "core/generics/bounded-type-parameters";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/generics/generic-subtypes.md": {
	id: "core/generics/generic-subtypes.md";
  slug: "core/generics/generic-subtypes";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/generics/type-erasure.md": {
	id: "core/generics/type-erasure.md";
  slug: "core/generics/type-erasure";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/generics/why-use-generics.md": {
	id: "core/generics/why-use-generics.md";
  slug: "core/generics/why-use-generics";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/generics/wildcards.md": {
	id: "core/generics/wildcards.md";
  slug: "core/generics/wildcards";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/integer-caching.md": {
	id: "core/integer-caching.md";
  slug: "core/integer-caching";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/java-sandbox.md": {
	id: "core/java-sandbox.md";
  slug: "core/java-sandbox";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/jre-vs-jvm-vs-jdk.md": {
	id: "core/jre-vs-jvm-vs-jdk.md";
  slug: "core/jre-vs-jvm-vs-jdk";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/jvm/heap-dump-vs-thread-dump-vs-core-dump.md": {
	id: "core/jvm/heap-dump-vs-thread-dump-vs-core-dump.md";
  slug: "core/jvm/heap-dump-vs-thread-dump-vs-core-dump";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/jvm/how-jvm-executes-java-code.md": {
	id: "core/jvm/how-jvm-executes-java-code.md";
  slug: "core/jvm/how-jvm-executes-java-code";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/jvm/jvm-life-cycle.md": {
	id: "core/jvm/jvm-life-cycle.md";
  slug: "core/jvm/jvm-life-cycle";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/main-method.md": {
	id: "core/main-method.md";
  slug: "core/main-method";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/object-creation-without-new.md": {
	id: "core/object-creation-without-new.md";
  slug: "core/object-creation-without-new";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/oop/design-patterns.md": {
	id: "core/oop/design-patterns.md";
  slug: "core/oop/design-patterns";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/oop/multiple-inheritance.md": {
	id: "core/oop/multiple-inheritance.md";
  slug: "core/oop/multiple-inheritance";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/questions.md": {
	id: "core/questions.md";
  slug: "core/questions";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/string/never-initialize-string-using-constructor.md": {
	id: "core/string/never-initialize-string-using-constructor.md";
  slug: "core/string/never-initialize-string-using-constructor";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/string/reference-vs-value-comparison.md": {
	id: "core/string/reference-vs-value-comparison.md";
  slug: "core/string/reference-vs-value-comparison";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/thread/creating-thread.md": {
	id: "core/thread/creating-thread.md";
  slug: "core/thread/creating-thread";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"core/variable-hiding.md": {
	id: "core/variable-hiding.md";
  slug: "core/variable-hiding";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"jdbc/execute-vs-execute-query-vs-execute-update.md": {
	id: "jdbc/execute-vs-execute-query-vs-execute-update.md";
  slug: "jdbc/execute-vs-execute-query-vs-execute-update";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"jdbc/statement-vs-prepared-statement-vs-callable-statement.md": {
	id: "jdbc/statement-vs-prepared-statement-vs-callable-statement.md";
  slug: "jdbc/statement-vs-prepared-statement-vs-callable-statement";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"i18n": Record<string, {
  id: string;
  collection: "i18n";
  data: InferEntrySchema<"i18n">;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
