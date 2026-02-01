import { describe, it, expect } from 'vitest';

const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  if (chunks.length === 0) chunks.push([]);
  return chunks;
};

describe('Pagination Logic', () => {
  it('should chunk 20 items into 3 pages (8 items per page)', () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const chunks = chunkItems(items, 8);
    expect(chunks.length).toBe(3);
    expect(chunks[0].length).toBe(8);
    expect(chunks[1].length).toBe(8);
    expect(chunks[2].length).toBe(4);
  });

  it('should return one empty page if there are no items', () => {
    const items = [];
    const chunks = chunkItems(items, 8);
    expect(chunks.length).toBe(1);
    expect(chunks[0].length).toBe(0);
  });
});
