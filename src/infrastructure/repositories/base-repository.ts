import { Model, ModelStatic } from "sequelize";

interface IMapper<TModel, TEntity> {
  toEntity(model: TModel): TEntity;
  toModel(entity: TEntity): Partial<TModel>;
}

export class BaseRepository<TModel extends Model, TEntity> {
  protected model: ModelStatic<TModel>;
  protected mapper: IMapper<TModel, TEntity>;

  constructor(model: ModelStatic<TModel>, mapper: IMapper<TModel, TEntity>) {
    this.model = model;
    this.mapper = mapper;
  }

  async findAll(): Promise<TEntity[]> {
    const models = await this.model.findAll();
    console.log('CHEGOU AQUI', this.model.name)
    return models.map(m => this.mapper.toEntity(m));
  }

  async findById(id: string | number): Promise<TEntity> {
    const model = await this.model.findByPk(id);
    if (!model) throw new Error(`${this.model.name} not found`);
    return this.mapper.toEntity(model);
  }

  async create(entity: TEntity): Promise<TEntity> {
    const data = this.mapper.toModel(entity);
    const model = await this.model.create(data as any);
    return this.mapper.toEntity(model);
  }

  async update(id: string | number, entity: TEntity): Promise<TEntity> {
    const model = await this.model.findByPk(id);
    if (!model) throw new Error(`${this.model.name} not found`);
    const data = this.mapper.toModel(entity);
    const updatedModel = await model.update(data);
    return this.mapper.toEntity(updatedModel);
  }

  async delete(id: string | number): Promise<void> {
    const model = await this.model.findByPk(id);
    if (!model) throw new Error(`${this.model.name} not found`);
    await model.destroy();
  }
}
