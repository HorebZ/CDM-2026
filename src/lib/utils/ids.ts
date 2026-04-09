export function createIdMap<T extends Record<string, unknown>>(obj: T): { [K in keyof T]: K } {
	return Object.fromEntries(Object.keys(obj).map((k) => [k, k])) as { [K in keyof T]: K };
}
