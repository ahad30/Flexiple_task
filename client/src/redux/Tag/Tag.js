export const tags = [
 
 
  {
    name: 'User', 
    tag: 'users', 
  },
  {
    name: 'Testimonial', 
    tag: 'testimonials', 
  }

];

export const getTagsByModuleName = (moduleName) => {
  return tags
    .filter(tag => tag.name.toLowerCase() === moduleName.toLowerCase())
    .map(tag => tag.tag);
};