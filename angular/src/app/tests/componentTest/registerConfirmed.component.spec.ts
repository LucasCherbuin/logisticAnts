import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RegisterConfirmedComponent } from '../../component/RegisterConfirmed.component';
describe('RegisterConfirmedComponent', () => {
  let component: RegisterConfirmedComponent;

  beforeEach(() => {
    vi.useFakeTimers();
    component = new RegisterConfirmedComponent();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('isVisible should be false by default', () => {
    expect(component.isVisible).toBe(false);
  });

  it('open should set isVisible to true', () => {
    const callback = vi.fn();
    component.open(callback);
    expect(component.isVisible).toBe(true);
  });

  it('open should not call the callback (current bug: callback is referenced but never invoked)', () => {
    const callback = vi.fn();
    component.open(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it('close should hide the popup after 5 seconds', () => {
    component.isVisible = true;
    component.close();
    vi.advanceTimersByTime(5000);
    expect(component.isVisible).toBe(false);
  });

  it('close should not hide the popup before 5 seconds', () => {
    component.isVisible = true;
    component.close();
    vi.advanceTimersByTime(4000);
    expect(component.isVisible).toBe(true);
  });

  it('open should automatically hide the popup after 5 seconds', () => {
    const callback = vi.fn();
    component.open(callback);
    vi.advanceTimersByTime(5000);
    expect(component.isVisible).toBe(false);
  });
});