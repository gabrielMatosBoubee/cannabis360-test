import { INicialState, IProduct } from "../interfaces/IRequests";
  
export function filterProducts(products: IProduct[], filters: INicialState): IProduct[] {
    if(products === undefined) return []
    const { company, validate, price, name } = filters;
  
    return products.filter((product) => {
      const isCompanyMatch = company === "all" || product.companyId === Number(company);
      const isValidateMatch = validate === null || new Date(product.expirationDate) >= new Date(validate);
      const isPriceMatch = price === "all" || product.price <= Number(price);
      const isNameMatch = name === "" || product.productName.toLowerCase().includes(name.toLowerCase());
      return isCompanyMatch && isValidateMatch && isPriceMatch && isNameMatch;
    });
  }
    