const typeDefs = `
  type Query {
   channels: [Channel]
   recipes: [Recipe]
  }

  type Channel {
   id: ID!
   name: String
  }

  type Recipe {
    id: ID!
    title: String
    preparationTime: Int
    servingCount: Int
    sideDish: String
    directions: String
    ingredients: [Ingredient]
  }

  type Ingredient {
    id: ID!
    name: String
    amount: Int
    amountUnit: String
  }

  type Mutation {
    addRecipe(
      title: String!,
      preparationTime: Int!,
      servingCount: Int!,
      sideDish: String,
      directions: String!
    ): Recipe
  }
`;

export { typeDefs };
