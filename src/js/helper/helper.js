export
class Helper {
    static elt(name, attributes, children) {
        var node = document.createElement(name);

        if(attributes) {
            for(var attr in attributes)
                if(attributes.hasOwnProperty(attr))
                    node.setAttribute(attr, attributes[attr]);
        }

        if(children) {
           for(let i = 0; i < children.length; i += 1) {
              let child = children[i];

              node.appendChild(child);
           }
        }

        return node;
    }

    static getCoords(elem) {
        // (1)
        var box = elem.getBoundingClientRect();
    
        var body = document.body;
        var docEl = document.documentElement;
    
        // (2)
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
        // (3)
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
        // (4)
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
    
        // (5)
        return { top: Math.round(top), left: Math.round(left) };
    }
}