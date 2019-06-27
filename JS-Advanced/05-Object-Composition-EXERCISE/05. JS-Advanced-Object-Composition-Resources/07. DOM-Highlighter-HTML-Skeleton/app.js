function solve(selector) {
    let nodes = document.querySelectorAll(selector);
    

    allDescendants(nodes);
    function allDescendants (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child = node.childNodes[i];
          allDescendants(child);
          child.classList.add('highlight');
        }
    }
}

solve('#content');