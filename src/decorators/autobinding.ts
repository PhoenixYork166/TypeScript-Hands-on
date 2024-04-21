namespace App {
    // Autobind Decorator
    export function Autobinding(
        // target: any, // tsconfig.json => "noUnusedParameters": false
        _: any,
        // methodName: string, 
        _2: string,
        descriptor: PropertyDescriptor
        ) {
            const originalMethod = descriptor.value;
            const adjDescriptor: PropertyDescriptor = {
                configurable: true,
                get() {
                    const boundFn = originalMethod.bind(this);
                    return boundFn;
                }
            };
            return adjDescriptor;
        }
}