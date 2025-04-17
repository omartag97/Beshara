# E-Commerce Store

A full-featured e-commerce store built with React, TypeScript, Redux Toolkit, and RTK Query.

## Features

- **User Authentication**: Registration and login functionality with form validation
- **Product Catalog**: Browse products by category with accordion-style navigation
- **Product Details**: View detailed information about products
- **Shopping Cart**: Add products to cart and manage quantities
- **Drag-and-Drop Cart Reordering**: Reorder items in your cart using drag-and-drop
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React with TypeScript
- Redux Toolkit and RTK Query for state management
- React Router for navigation
- dnd-kit for drag-and-drop functionality
- Tailwind CSS for styling
- Motion library for animations

## Installation

1. Clone the repository:

```bash
git clone https://github.com/omartag97/e-commerce-store.git
cd e-commerce-store
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Registration**: Create a new account with the registration form
2. **Login**: Log in with your credentials
3. **Browse Products**: Explore products by category on the home page
4. **View Product Details**: Click on a product to see more information
5. **Add to Cart**: Add products to your cart from the product cards or details page
6. **Manage Cart**: View, update quantities, and reorder items in your cart
7. **Checkout**: Proceed to checkout with your selected items

## API Integration

This project uses the [FakeStore API](https://fakestoreapi.com/) to fetch product data. The following endpoints are used:

- `/products/categories` - Get product categories
- `/products/category/{category}` - Get products by category
- `/products/{id}` - Get product details

## Project Structure

- `/src/modules` - Feature-based modules (auth, products, cart, etc.)
- `/src/redux` - Redux store configuration, slices, and API services
- `/src/interface` - TypeScript interfaces
- `/src/shared` - Shared components and hooks

## Future Improvements

- Add search functionality
- Implement filters for products
- Add order history
- Implement wishlist feature

## License

MIT
