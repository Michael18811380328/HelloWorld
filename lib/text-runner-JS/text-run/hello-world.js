module.exports = async function (activity) {
  console.log('This code runs inside the "hello-world" block implementation.')
  console.log('I found these elements in your document:')

  console.log(activity.nodes)

  // capture content from the document
  // const content = activity.searcher.tagContent('boldtext')
  // do something with the content
  // formatter.log(content)
}
