import { CONST_EXPR, assertionsEnabled } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { getDebugNode } from 'angular2/src/core/debug/debug_node';
import { DomRootRenderer } from 'angular2/src/platform/dom/dom_renderer';
import { RootRenderer, NgZone, ApplicationRef } from 'angular2/core';
import { DebugDomRootRenderer } from 'angular2/src/core/debug/debug_renderer';
const CORE_TOKENS = CONST_EXPR({ 'ApplicationRef': ApplicationRef, 'NgZone': NgZone });
const INSPECT_GLOBAL_NAME = 'ng.probe';
const CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
export function inspectNativeElement(element) {
    return getDebugNode(element);
}
function createConditionalRootRenderer(rootRenderer) {
    if (assertionsEnabled()) {
        return createRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
function createRootRenderer(rootRenderer) {
    DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    DOM.setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
    return new DebugDomRootRenderer(rootRenderer);
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export const ELEMENT_PROBE_PROVIDERS = CONST_EXPR([
    new Provider(RootRenderer, { useFactory: createConditionalRootRenderer, deps: [DomRootRenderer] })
]);
export const ELEMENT_PROBE_PROVIDERS_PROD_MODE = CONST_EXPR([new Provider(RootRenderer, { useFactory: createRootRenderer, deps: [DomRootRenderer] })]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLTFIZW9qTHBVLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RlYnVnL25nX3Byb2JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFZLE1BQU0sMEJBQTBCO09BQzFFLEVBQXNCLFFBQVEsRUFBQyxNQUFNLHNCQUFzQjtPQUMzRCxFQUFDLEdBQUcsRUFBQyxNQUFNLHVDQUF1QztPQUNsRCxFQUFZLFlBQVksRUFBQyxNQUFNLG9DQUFvQztPQUNuRSxFQUFDLGVBQWUsRUFBQyxNQUFNLHdDQUF3QztPQUMvRCxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZTtPQUMzRCxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDO0FBRTNFLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxFQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztBQUVyRixNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUN2QyxNQUFNLHVCQUF1QixHQUFHLGVBQWUsQ0FBQztBQUVoRDs7OztHQUlHO0FBQ0gscUNBQXFDLE9BQU87SUFDMUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQsdUNBQXVDLFlBQVk7SUFDakQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCw0QkFBNEIsWUFBWTtJQUN0QyxHQUFHLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsR0FBRyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN2RCxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxPQUFPLE1BQU0sdUJBQXVCLEdBQVUsVUFBVSxDQUFDO0lBQ3ZELElBQUksUUFBUSxDQUFDLFlBQVksRUFDWixFQUFDLFVBQVUsRUFBRSw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBQyxDQUFDO0NBQ25GLENBQUMsQ0FBQztBQUVILE9BQU8sTUFBTSxpQ0FBaUMsR0FBVSxVQUFVLENBQzlELENBQUMsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUX0VYUFIsIGFzc2VydGlvbnNFbmFibGVkLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0luamVjdGFibGUsIHByb3ZpZGUsIFByb3ZpZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RlYnVnTm9kZSwgZ2V0RGVidWdOb2RlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19ub2RlJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlciwgTmdab25lLCBBcHBsaWNhdGlvblJlZn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0RlYnVnRG9tUm9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kZWJ1Zy9kZWJ1Z19yZW5kZXJlcic7XG5cbmNvbnN0IENPUkVfVE9LRU5TID0gQ09OU1RfRVhQUih7J0FwcGxpY2F0aW9uUmVmJzogQXBwbGljYXRpb25SZWYsICdOZ1pvbmUnOiBOZ1pvbmV9KTtcblxuY29uc3QgSU5TUEVDVF9HTE9CQUxfTkFNRSA9ICduZy5wcm9iZSc7XG5jb25zdCBDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSA9ICduZy5jb3JlVG9rZW5zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEge0BsaW5rIERlYnVnRWxlbWVudH0gZm9yIHRoZSBnaXZlbiBuYXRpdmUgRE9NIGVsZW1lbnQsIG9yXG4gKiBudWxsIGlmIHRoZSBnaXZlbiBuYXRpdmUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGFuIEFuZ3VsYXIgdmlldyBhc3NvY2lhdGVkXG4gKiB3aXRoIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE5hdGl2ZUVsZW1lbnQoZWxlbWVudCk6IERlYnVnTm9kZSB7XG4gIHJldHVybiBnZXREZWJ1Z05vZGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbmRpdGlvbmFsUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcik6IFJvb3RSZW5kZXJlciB7XG4gIGlmIChhc3NlcnRpb25zRW5hYmxlZCgpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpO1xuICB9XG4gIHJldHVybiByb290UmVuZGVyZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvb3RSZW5kZXJlcihyb290UmVuZGVyZXIpOiBSb290UmVuZGVyZXIge1xuICBET00uc2V0R2xvYmFsVmFyKElOU1BFQ1RfR0xPQkFMX05BTUUsIGluc3BlY3ROYXRpdmVFbGVtZW50KTtcbiAgRE9NLnNldEdsb2JhbFZhcihDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSwgQ09SRV9UT0tFTlMpO1xuICByZXR1cm4gbmV3IERlYnVnRG9tUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcik7XG59XG5cbi8qKlxuICogUHJvdmlkZXJzIHdoaWNoIHN1cHBvcnQgZGVidWdnaW5nIEFuZ3VsYXIgYXBwbGljYXRpb25zIChlLmcuIHZpYSBgbmcucHJvYmVgKS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTOiBhbnlbXSA9IENPTlNUX0VYUFIoW1xuICBuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLFxuICAgICAgICAgICAgICAge3VzZUZhY3Rvcnk6IGNyZWF0ZUNvbmRpdGlvbmFsUm9vdFJlbmRlcmVyLCBkZXBzOiBbRG9tUm9vdFJlbmRlcmVyXX0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX1BST0RfTU9ERTogYW55W10gPSBDT05TVF9FWFBSKFxuICAgIFtuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLCB7dXNlRmFjdG9yeTogY3JlYXRlUm9vdFJlbmRlcmVyLCBkZXBzOiBbRG9tUm9vdFJlbmRlcmVyXX0pXSk7XG4iXX0=