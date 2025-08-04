import { describe, it, expect, vi } from 'vitest';

import { generateReportData } from './data';

//spies are wrappers around functions or empty replacements for functions that allow you track if & how a function was called

describe('generateReportData()', () => {
  it('should execute logFn if provided', () => {
    const logger = vi.fn(); // spy, keeps track of this function, whether it was called etc., we can add a behaviour to this spy function

    // logger.mockImplementationOnce(() => {});

    generateReportData(logger);

    expect(logger).toBeCalled();
  });
});
