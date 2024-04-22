// Autobind Decorator
export function Autobinding(
// target: any, // tsconfig.json => "noUnusedParameters": false
_, 
// methodName: string, 
_2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
