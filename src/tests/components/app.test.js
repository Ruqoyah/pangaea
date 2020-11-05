import React from 'react';
// import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';
import { PRODUCTS, CURRENCY } from '../../actions';
import App from '../../components/App';
import Cart from '../../components/Cart';
import Products from '../../components/Products'

configure({ adapter: new Adapter() });

const mocksClient = [
  {
    request: {
      query: PRODUCTS('USD')
    },
    result: {
      data: {
        products: [
          { __typename: "Product", id: 3, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png", title: "Premium-Grade Moisturizing Balm", price: 29 },
          { __typename: "Product", id: 2, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png", title: "No-Nonsense Charcoal Cleanser", price: 16 },
          // { __typename: "Product", id: 42, image_url: "https://i.shgcdn.com/b44f5ef8-6bc0-4a4a-8eef-1f7ce…ormat/auto/-/preview/3000x3000/-/quality/lighter/", title: "Clarifying Body Wash", price: 10 },
          // { __typename: "Product", id: 39, image_url: "https://i.shgcdn.com/4c9671b2-8161-4e58-b3b5-cefa7…ormat/auto/-/preview/3000x3000/-/quality/lighter/", title: "Keratin Recovery Shampoo", price: 12 },
          // { __typename: "Product", id: 40, image_url: "https://i.shgcdn.com/aaef22bc-bf48-4e0d-81c2-48226…ormat/auto/-/preview/3000x3000/-/quality/lighter/", title: "Keratin Strengthening Conditioner", price: 10 },
          // { __typename: "Product", id: 41, image_url: "https://i.shgcdn.com/f1ae9d7a-ca43-4a2d-a5cf-c4550…ormat/auto/-/preview/3000x3000/-/quality/lighter/", title: "Advanced Repair Scalp Treatment", price: 15 },
          // { __typename: "Product", id: 14, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/dark-circle-defense.png", title: "Dark Circle Defense", price: 29 },
          // { __typename: "Product", id: 47, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/face-mask.jpg", title: "Intensive Repair Face Mask", price: 20 },
          // { __typename: "Product", id: 43, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/eye-patch.png", title: "Anti-Fatigue Eye Patch", price: 20 },
          // { __typename: "Product", id: 12, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/anti-wrinkle-serum.png", title: "Anti-Wrinkle Defense", price: 19 },
          // { __typename: "Product", id: 4, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/reload-exfoliating-rub.png", title: "Reload Exfoliating Rub", price: 16 },
          // { __typename: "Product", id: 44, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/pore-strip.png", title: "Charcoal Cleansing Pore Strip", price: 20 },
          // { __typename: "Product", id: 10, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/age-management.png", title: "Age Management Collection", price: 60 },
          // { __typename: "Product", id: 13, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/classic-maintenance.png", title: "Classic Maintenance", price: 60 },
          // { __typename: "Product", id: 25, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/correction-trio.png", title: "Correction Trio Collection", price: 60 },
          // { __typename: "Product", id: 36, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/all-products.png", title: "The Complete Skincare Gift Set", price: 89 },
          // { __typename: "Product", id: 7, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/recovery-oil.png", title: "After Hours Recovery Oil", price: 19 },
          // { __typename: "Product", id: 45, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/deflator.png", title: "Eye Depuffer", price: 12 },
          // { __typename: "Product", id: 46, image_url: "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/face-mist.png", title: "Hydrating Mist Spray", price: 12 }
        ]
      },
    },
  },
  {
    request: {
      query: CURRENCY(),
    },
    result: {
      data: {
        currency: ["USD", "AED", "AFN", "ALL"]
      },
    },
  },
];

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocksClient}>
      <App />
    </MockedProvider>
  );
});

it('should render loading state initially', () => {
  const component = renderer.create(
    <MockedProvider mocks={[]}>
      <App />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children[0].children[1].children).toContain('loading...');
});

it('should find add to cart button and simulate click', async () => {
  const component = renderer.create(
    <MockedProvider mocks={mocksClient}>
      <App />
    </MockedProvider>
  );
  await new Promise(resolve => setTimeout(resolve, 0));
  // console.log(component.toJSON().children[1].children[0].children[1].children, 'component')
  // console.log(component.toJSON(), 'compon')

  // const element = component.root.findByType('div.product-btn');
  // element.props.className.includes("btn-group")
  // console.log(component.getInstance(), 'instance')
  console.log(component.root.findByProps({ className: "product-btn" }), 'element')
  element.props.onClick(); // fires the mutation


});


// test('renders without error', () => {
//   const { getByText } = render (
//     <MockedProvider mocks={mocksClient}>
//       <App />
//     </MockedProvider>,
//   );
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// describe('onAddToCart()', () => {
//   it('add product to cart', () => {
//     // const wrapper = setup();
//     // const action = wrapper.instance();
//     //   const event = {
//     //     target: { name: 'searchRecipes', value: 'yum yum' }
//     //   };
//     //   action.searchHandler(event);
//     //   expect(action.state.searchRecipes).toBe(event.target.value);

//     const spy = sinon.spy(App.prototype, 'onAddToCart');
//     shallow(
//       <MockedProvider mocks={mocksClient}>
//         <App onAddToCart={spy} />
//       </MockedProvider>
//     )
//       .instance().onClick({ setState: () => 1 });
//   });

//   // it('should get all recipes when state does not change', () => {
//   //   const wrapper = setup();
//   //   const action = wrapper.instance();
//   //   const event = {
//   //     target: { name: 'searchRecipes', value: '' }
//   //   };
//   //   action.searchHandler(event);
//   //   expect(action.state.loader).toBe(true);
//   // });
// });