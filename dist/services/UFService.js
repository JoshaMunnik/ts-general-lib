/**
 * @author Josha Munnik
 * @copyright Copyright (c) 2024 Ultra Force Development
 * @license
 * MIT License
 *
 * Copyright (c) 2024 Josha Munnik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
// region private functions
// endregion
// region types
/**
 * The different service provider types.
 */
var ServiceProviderType;
(function (ServiceProviderType) {
    ServiceProviderType[ServiceProviderType["Factory"] = 0] = "Factory";
    ServiceProviderType[ServiceProviderType["Constructor"] = 1] = "Constructor";
    ServiceProviderType[ServiceProviderType["Static"] = 2] = "Static";
    ServiceProviderType[ServiceProviderType["SingletonFactory"] = 3] = "SingletonFactory";
    ServiceProviderType[ServiceProviderType["SingletonConstructor"] = 4] = "SingletonConstructor";
})(ServiceProviderType || (ServiceProviderType = {}));
// endregion
// region exports
/**
 * The {@link UFService} implements a dependency injection mechanism.
 *
 * Services are registered with a name using {@link registerFactory}, {@link registerConstructor},
 * {@link registerSingletonFactory}, {@link registerSingletonConstructor},
 * {@link registerStatic}.
 *
 * A service may depend on other services. When a service is requested, the dependent services
 * are injected into the service provider function (either a factory or constructor function).
 *
 * Use {@link getInstance} to get a service.
 *
 * To inject services into a call use {@link call}.
 *
 * To construct a class (via new) injecting services into the constructor function
 * use {@link construct}.
 *
 * Add '()' to a service name to get a factory function (no parameters) that can be used to create
 * instances for that service. The factory function will call {@link getInstance} to get
 * the service instance.
 *
 * @example
 * // some model and controller class
 * class MainModel {
 *   // ...
 * }
 * class MainController {
 *   // ...
 * }
 * // a view for an enemy
 * class EnemyView {
 *   // ...
 * }
 * // register services
 * UFService.registerConstructor('game.models.MainModel', MainModel);
 * UFService.registerConstructor('game.controllers.MainController', MainController);
 * UFService.registerConstructor('game.views.Enemy', EnemyView);
 *
 * @example
 * // some factory function to create a view
 * function viewFactory(aMainData, aMainController) {
 *   // create view
 *   return {
 *     // some public methods
 *   };
 * }
 *
 * const viewInstance = UF.callWithServices(
 *   viewFactory, ['game.models.MainModel', 'game.controllers.MainController']
 * );
 *
 * @example
 * // Creates a view with factory function
 * function viewFactory(aMainData, aMainController, anEnemyFactory) {
 *   const enemies = [];
 *   // ...
 *   function createEnemies(aCount) {
 *     for(let index = 0; index < aCount; index++) {
 *       enemies.push(anEnemyFactory());
 *     }
 *   }
 *   return {
 *     // some public methods
 *   };
 * }
 * // note the () with last service name
 * const viewInstance = UF.callWithServices(
 *   viewFactory, ['game.models.MainModel', 'game.controllers.MainController', 'game.views.Enemy()']
 * );
 */
export class UFService {
    // endregion
    // region public methods
    /**
     * Registers a service that is created using a factory function. The service is created
     * by invoking the factory function injecting the dependent types.
     *
     * @param name
     *   Name of service
     * @param factory
     *   Factory function that creates the service.
     * @param services
     *   Name of other services that should be resolved an injected into the factory function.
     *   The order of the service names is the order in which they are injected.
     */
    static registerFactory(name, factory, services = []) {
        UFService.s_services.set(name, {
            type: ServiceProviderType.Factory,
            factoryProvider: factory,
            constructorProvider: null,
            staticProvider: null,
            instance: null,
            services: services,
            factory: null
        });
    }
    /**
     * Registers a service that is created using a factory function. The first time the service is
     * requested, it is created by invoking the factory function injecting the dependent types.
     *
     * Subsequent requests for the service will return the same instance.
     *
     * @param name
     *   Name of service
     * @param factory
     *   Factory function that creates the service.
     * @param services
     *   Name of other services that should be resolved an injected into the factory function.
     *   The order of the service names is the order in which they are injected.
     */
    static registerSingletonFactory(name, factory, services = []) {
        UFService.s_services.set(name, {
            type: ServiceProviderType.SingletonFactory,
            factoryProvider: factory,
            constructorProvider: null,
            staticProvider: null,
            instance: null,
            services: services,
            factory: null
        });
    }
    /**
     * Registers a service that is an instance of some class. The service is created by
     * using new on the constructor function injecting the dependent types.
     *
     * @param name
     *   Name of service
     * @param constructor
     *   Constructor function that creates the service.
     * @param services
     *   Name of other services that should be resolved an injected into the constructor function.
     *   The order of the service names is the order in which they are injected.
     */
    static registerConstructor(name, constructor, services = []) {
        UFService.s_services.set(name, {
            type: ServiceProviderType.Constructor,
            factoryProvider: null,
            constructorProvider: constructor,
            staticProvider: null,
            instance: null,
            services: services,
            factory: null
        });
    }
    /**
     * Registers a service that is an instance of some class. The first time the service is requested,
     * it is created by using new on the constructor function injecting the dependent types.
     *
     * Subsequent requests for the service will return the same instance.
     *
     * @param name
     *   Name of service
     * @param constructor
     *   Constructor function that creates the service.
     * @param services
     *   Name of other services that should be resolved an injected into the constructor function.
     *   The order of the service names is the order in which they are injected.
     */
    static registerSingletonConstructor(name, constructor, services = []) {
        UFService.s_services.set(name, {
            type: ServiceProviderType.SingletonConstructor,
            factoryProvider: null,
            constructorProvider: constructor,
            staticProvider: null,
            instance: null,
            services: services,
            factory: null
        });
    }
    /**
     * Registers a service that is already created.
     *
     * @param {string} name
     *   Name of service
     * @param objectValue
     *   Object that wil be returned when the service is requested.
     */
    static registerStatic(name, objectValue) {
        UFService.s_services.set(name, {
            type: ServiceProviderType.Static,
            factoryProvider: null,
            constructorProvider: null,
            staticProvider: objectValue,
            instance: null,
            services: [],
            factory: null
        });
    }
    /**
     * Checks if a service of certain name exists.
     *
     * @param name
     *   Name of service
     *
     * @returns True if there is a service.
     */
    static has(name) {
        return UFService.s_services.has(name);
    }
    /**
     * Gets a service instance for a certain service.
     *
     * @param name
     *   Service name
     *
     * @returns an instance implementing the service.
     */
    static getInstance(name) {
        UFService.validateService(name);
        const service = UFService.s_services.get(name);
        switch (service.type) {
            case ServiceProviderType.Constructor:
                return new service.constructorProvider(...UFService.getServiceInstancesFromNames(service.services));
            case ServiceProviderType.Factory:
                return service.factoryProvider(...UFService.getServiceInstancesFromNames(service.services));
            case ServiceProviderType.Static:
                return service.staticProvider;
            case ServiceProviderType.SingletonConstructor:
                if (!service.instance) {
                    service.instance = new service.constructorProvider(...UFService.getServiceInstancesFromNames(service.services));
                }
                return service.instance;
            case ServiceProviderType.SingletonFactory:
                if (!service.instance) {
                    service.instance = service.factoryProvider(...UFService.getServiceInstancesFromNames(service.services));
                }
                return service.instance;
        }
    }
    /**
     * Calls a function injecting service instances / factories as arguments.
     *
     * @param functionValue
     *   Function to call
     * @param services
     *   Services to inject.
     * @returns Result from function call
     *
     */
    static call(functionValue, services) {
        return functionValue(...UFService.getServiceInstancesFromNames(services));
    }
    /**
     * Constructs a class (via new) by injecting service instances / factories into the
     * constructor function.
     *
     * @param constructor
     *   Constructor function
     * @param services
     *   Services to inject.
     *
     * @returns instance of class defined by aConstructor
     */
    static construct(constructor, services) {
        return new constructor(...UFService.getServiceInstancesFromNames(services));
    }
    // endregion
    // region private methods
    /**
     * Checks if a service of certain name exists. If not, an error is thrown.
     *
     * @param name
     *   Name of service to check
     *
     * @throws Error if service does not exist.
     *
     * @private
     */
    static validateService(name) {
        if (!UFService.has(name)) {
            throw new Error(`Can not find service: ${name}`);
        }
    }
    /**
     * Processes a list of service names and returns service instances / service factories.
     *
     * @private
     *
     * @param services
     *   A list of service names. If '()' is added to a name, return a factory for that entry.
     *
     * @returns A list of service instances and factories, the same order as the aServices list.
     */
    static getServiceInstancesFromNames(services) {
        return services.map(service => service.endsWith('()')
            ? UFService.getServiceFactory(service.slice(0, -2))
            : UFService.getInstance(service));
    }
    /**
     * Gets a factory function to create a service of specified name.
     *
     * @private
     *
     * @param name
     *   Name of service
     *
     * @returns a function that creates an instance of the service.
     */
    static getServiceFactory(name) {
        UFService.validateService(name);
        const service = UFService.s_services.get(name);
        if (!service.factory) {
            service.factory = () => UFService.getInstance(name);
        }
        return service.factory;
    }
}
// region private variables
/**
 * A dynamic object to which services are added. The key is the service name, the value is a
 * service definition.
 *
 * @private
 */
UFService.s_services = new Map();
// endregion
//# sourceMappingURL=UFService.js.map