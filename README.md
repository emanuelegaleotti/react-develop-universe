
# react-develop-universe

## How to use
The library is on the `/lib` folder.

You can develop the library with storybook. To do it: `npm run storybook`.

To test the library in the project:
1) `npm run build`, build the library
2) `npm run dev` for local web server. 
Note: Every time you change the library you have to do `npm run build` to reload it

## How to publish a new release
On the main branch:
1) `npm run release`
2) `git push --follow-tags`
3) `npm publish`

## Sources
https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
