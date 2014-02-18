var authors = {
  'LeiLei Wu': 'lei'
};

hexo.extend.helper.register('author_avatar', function(name){
  return '/avatar/bg-avatar-' + authors[name] + '.png';
});