export class ProductModel {
  constructor(
    public productId = 0,
    public name = '',
    public brand = '',
    public price = '',
    public image = '',
    public description = '',
    public sizes = [],
  ) {}
}
