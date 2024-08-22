import { TQuery } from "../sports/sports.interface";

type QueryMap = {
  [key: string]: string | number | undefined;
};

class QueryBuilder {
  query: any;
  queryStr: Partial<TQuery>;
  constructor(query: any, queryStr: Partial<TQuery>) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchByName() {
    const name = this.queryStr.name
      ? { name: { $regex: `${this.queryStr.name}`, $options: "i" } }
      : {};
    this.query = this.query.find({ ...name });
    return this;
  }
  searchByCategory() {
    const category =
      this.queryStr.category !== "All"
        ? { category: this.queryStr.category }
        : {};

    this.query = this.query.find({ ...category });
    return this;
  }
  searchByBrand() {
    const brand =
      this.queryStr.brand !== "All" ? { brand: this.queryStr.brand } : {};
    this.query = this.query.find({ ...brand });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["limit", "page", "name", "category", "brand", "sort"];
    // remove some fields
    removeFields.forEach((field) => delete (queryCopy as QueryMap)[field]);

    // filter with price and ratings
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  pagination() {
    const currentPage = Number(this.queryStr.page);
    const limit = Number(this.queryStr.limit);
    const skip = (currentPage - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  sorting() {
    const sortingValue = this.queryStr.sort;
    if (sortingValue === "asc") {
      this.query = this.query.sort({ price: 1 });
    } else {
      this.query = this.query.sort({ price: -1 });
    }
    return this;
  }
}

export default QueryBuilder;
