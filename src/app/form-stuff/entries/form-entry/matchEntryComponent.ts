export async function matchEntryComponent(name: string, value: unknown) {
  for (const [matcher, component] of matchersAndComponents) {
    if (matcher(name, value)) {
      return await component();
    }
  }
  // throw new Error(`No component found for ${name}`);
}
type EntryMatcher = (name: string, value: unknown) => boolean;
const matchersAndComponents = new Map<EntryMatcher, any>();
matchersAndComponents.set(
  (_: any, value: unknown) => typeof value === 'string',
  () =>
    import('../string-entry/string-entry.component').then(
      (m) => m.StringEntryComponent,
    ),
);
matchersAndComponents.set(
  (_: any, value: unknown) => typeof value === 'number',
  () =>
    import('../num-entry/num-entry.component').then((m) => m.NumEntryComponent),
);
matchersAndComponents.set(
  (_: any, value: unknown) => value instanceof Date,
  () =>
    import('../date-entry/date-entry.component').then(
      (m) => m.DateEntryComponent,
    ),
);
matchersAndComponents.set(
  (_: any, value: unknown) =>
    typeof value === 'object' && !Array.isArray(value),
  () =>
    import('../object-entry/object-entry.component').then(
      (m) => m.ObjectEntryComponent,
    ),
);
