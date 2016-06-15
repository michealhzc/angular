import { isPresent } from 'angular2/src/facade/lang';
import * as o from '../output/output_ast';
export function getPropertyInView(property, viewPath) {
    if (viewPath.length === 0) {
        return property;
    }
    else {
        var viewProp = o.THIS_EXPR;
        for (var i = 0; i < viewPath.length; i++) {
            viewProp = viewProp.prop('declarationAppElement').prop('parentView');
        }
        if (property instanceof o.ReadPropExpr) {
            var lastView = viewPath[viewPath.length - 1];
            let readPropExpr = property;
            // Note: Don't cast for members of the AppView base class...
            if (lastView.fields.some((field) => field.name == readPropExpr.name) ||
                lastView.getters.some((field) => field.name == readPropExpr.name)) {
                viewProp = viewProp.cast(lastView.classType);
            }
        }
        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
    }
}
export function injectFromViewParentInjector(token, optional) {
    var method = optional ? 'getOptional' : 'get';
    return o.THIS_EXPR.prop('parentInjector').callMethod(method, [createDiTokenExpression(token)]);
}
export function getViewFactoryName(component, embeddedTemplateIndex) {
    return `viewFactory_${component.type.name}${embeddedTemplateIndex}`;
}
export function createDiTokenExpression(token) {
    if (isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
export function createFlatArray(expressions) {
    var lastNonArrayExpressions = [];
    var result = o.literalArr([]);
    for (var i = 0; i < expressions.length; i++) {
        var expr = expressions[i];
        if (expr.type instanceof o.ArrayType) {
            if (lastNonArrayExpressions.length > 0) {
                result =
                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                lastNonArrayExpressions = [];
            }
            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
        }
        else {
            lastNonArrayExpressions.push(expr);
        }
    }
    if (lastNonArrayExpressions.length > 0) {
        result =
            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtMUhlb2pMcFUudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQVUsTUFBTSwwQkFBMEI7T0FFcEQsS0FBSyxDQUFDLE1BQU0sc0JBQXNCO0FBUXpDLGtDQUFrQyxRQUFzQixFQUFFLFFBQXVCO0lBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksUUFBUSxHQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxZQUFZLEdBQW1CLFFBQVEsQ0FBQztZQUM1Qyw0REFBNEQ7WUFDNUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNoRSxRQUFRLENB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QUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU07WUFDRixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5SW5WaWV3KHByb3BlcnR5OiBvLkV4cHJlc3Npb24sIHZpZXdQYXRoOiBDb21waWxlVmlld1tdKTogby5FeHByZXNzaW9uIHtcbiAgaWYgKHZpZXdQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlld1Byb3A6IG8uRXhwcmVzc2lvbiA9IG8uVEhJU19FWFBSO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlld1BhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AucHJvcCgnZGVjbGFyYXRpb25BcHBFbGVtZW50JykucHJvcCgncGFyZW50VmlldycpO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBvLlJlYWRQcm9wRXhwcikge1xuICAgICAgdmFyIGxhc3RWaWV3ID0gdmlld1BhdGhbdmlld1BhdGgubGVuZ3RoIC0gMV07XG4gICAgICBsZXQgcmVhZFByb3BFeHByOiBvLlJlYWRQcm9wRXhwciA9IHByb3BlcnR5O1xuICAgICAgLy8gTm90ZTogRG9uJ3QgY2FzdCBmb3IgbWVtYmVycyBvZiB0aGUgQXBwVmlldyBiYXNlIGNsYXNzLi4uXG4gICAgICBpZiAobGFzdFZpZXcuZmllbGRzLnNvbWUoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09IHJlYWRQcm9wRXhwci5uYW1lKSB8fFxuICAgICAgICAgIGxhc3RWaWV3LmdldHRlcnMuc29tZSgoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gcmVhZFByb3BFeHByLm5hbWUpKSB7XG4gICAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AuY2FzdChsYXN0Vmlldy5jbGFzc1R5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gby5yZXBsYWNlVmFySW5FeHByZXNzaW9uKG8uVEhJU19FWFBSLm5hbWUsIHZpZXdQcm9wLCBwcm9wZXJ0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgbWV0aG9kID0gb3B0aW9uYWwgPyAnZ2V0T3B0aW9uYWwnIDogJ2dldCc7XG4gIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdwYXJlbnRJbmplY3RvcicpLmNhbGxNZXRob2QobWV0aG9kLCBbY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24odG9rZW4pXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3RmFjdG9yeU5hbWUoY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkZGVkVGVtcGxhdGVJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB2aWV3RmFjdG9yeV8ke2NvbXBvbmVudC50eXBlLm5hbWV9JHtlbWJlZGRlZFRlbXBsYXRlSW5kZXh9YDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24odG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKTogby5FeHByZXNzaW9uIHtcbiAgaWYgKGlzUHJlc2VudCh0b2tlbi52YWx1ZSkpIHtcbiAgICByZXR1cm4gby5saXRlcmFsKHRva2VuLnZhbHVlKTtcbiAgfSBlbHNlIGlmICh0b2tlbi5pZGVudGlmaWVySXNJbnN0YW5jZSkge1xuICAgIHJldHVybiBvLmltcG9ydEV4cHIodG9rZW4uaWRlbnRpZmllcilcbiAgICAgICAgLmluc3RhbnRpYXRlKFtdLCBvLmltcG9ydFR5cGUodG9rZW4uaWRlbnRpZmllciwgW10sIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gby5pbXBvcnRFeHByKHRva2VuLmlkZW50aWZpZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGF0QXJyYXkoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdKTogby5FeHByZXNzaW9uIHtcbiAgdmFyIGxhc3ROb25BcnJheUV4cHJlc3Npb25zID0gW107XG4gIHZhciByZXN1bHQ6IG8uRXhwcmVzc2lvbiA9IG8ubGl0ZXJhbEFycihbXSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwcmVzc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZXhwciA9IGV4cHJlc3Npb25zW2ldO1xuICAgIGlmIChleHByLnR5cGUgaW5zdGFuY2VvZiBvLkFycmF5VHlwZSkge1xuICAgICAgaWYgKGxhc3ROb25BcnJheUV4cHJlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIHJlc3VsdC5jYWxsTWV0aG9kKG8uQnVpbHRpbk1ldGhvZC5Db25jYXRBcnJheSwgW28ubGl0ZXJhbEFycihsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucyldKTtcbiAgICAgICAgbGFzdE5vbkFycmF5RXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5jYWxsTWV0aG9kKG8uQnVpbHRpbk1ldGhvZC5Db25jYXRBcnJheSwgW2V4cHJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdE5vbkFycmF5RXhwcmVzc2lvbnMucHVzaChleHByKTtcbiAgICB9XG4gIH1cbiAgaWYgKGxhc3ROb25BcnJheUV4cHJlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICByZXN1bHQgPVxuICAgICAgICByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtvLmxpdGVyYWxBcnIobGFzdE5vbkFycmF5RXhwcmVzc2lvbnMpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==