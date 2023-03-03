import { Template } from '../entity/Template';

export interface TemplateGatewayInterface {
    insert(template: Template): Promise<void>;
    find(id: string): Promise<Template>;
    delete(id: string): Promise<void>;
    update(id: string, template: Template): Promise<void>;
}
