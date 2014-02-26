var authors = {
  'Ben Lin': 'ben',
  'Shao Lee': 'shao',
  'Leo Lin': 'leo',
  'Jonathan Dang': 'jonathan',
  'Carlos Liu': 'carlos',
  'Howard Huang': 'howard',
  'Ray Shih': 'ray',
  'Ting-Yu Lin': '200',
  'Rick Chen': 'rick',
  'Lei Lei Wu': 'lei',
  'Jason Peng': 'jason',
  'Tommy Chen': 'tommy',
  'TT': 'tt',
  'JJ': 'jj'
};

hexo.extend.helper.register('author_avatar', function(name){
  return '/img/avatar/bg-avatar-' + authors[name] + '.png';
});