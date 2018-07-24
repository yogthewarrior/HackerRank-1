var TEXT_BOX = 'TEXT_BOX'
var TEXT_AREA = 'TEXT_AREA'
var CHECK_BOX = 'CHECK_BOX'
var DROP_DOWN = 'DROP_DOWN'
var dropDownlist = [{ key: 'key-1', value: 'value-1' },{ key: 'key-2', value: 'value-2' }]

function contructFormField(name, type) {
    var result = '<div class="form-group">'
        + '<label for="' + type + '">' + name + '</label>'
        + '<input type="' + type + '" class="form-control" id="' + type + '" placeholder="Enter ' + name + '" name="' + name + '">'
        + '</div>';
    return result;
}

function contructCheckbox(name) {
    var result = '<div class="checkbox">'
        + '<label><input type="checkbox" name="' + name + '"> ' + name + '</label>'
        + '</div>';
    return result;
}

function contructTextarea(name) {
    var result = '<div class="form-group">'
        + '<label for="' + name + '">' + name + '</label>'
        + '<textarea class="form-control" id="' + name + '"   rows="3" > </textarea>'
        + '</div>';
    return result;
}

function contructDecimalField(name) {
    var result = '<div class="form-group">'
        + '<label>' + name + '</label>'
        + '<input type="number" placeholder="0.00" required name="price" min="0" value="0" step="0.01"">'
        + '</div>';
    return result;
}

function constructDropdown(list) {
    var result = '<select>'
    list.forEach(function (element) {
        console.log(element.key);
        console.log(element.value);
        result = result + ' <option key="' + element.key + '">' + element.value + '</option>'
    });
    result = result + '</select>'
    return result;
}



// Drag & Drop

var toolsetConfig = { // Configuration to add the different Form feild
    'TF': {
        config: {
            type: TEXT_BOX
        }
    },
    'CHK': {
        config: {
            type: CHECK_BOX
        }
    },
    'DD': {
        config: {
            type: DROP_DOWN,
            options: dropDownlist
        }
    },
    'TA': {
        config: {
            type: TEXT_AREA
        }
    }
}
var mouseDown = false
    , $currentTool = {}
    , $document = $(document)
    , $container = $('.form-container');
$document.ready(function () {
    let x = 0;
    $('.toolset .tool').each(function (i, tool) {
        var $tool = $(tool)
            , toolConfig = toolsetConfig[$tool.attr('id')];
        $tool.css({ left: x })
        x += 120;
    })
        .on('mousedown', function (e) {
            mouseDown = true;
            var $tool = $(e.target);
            $currentTool = {
                elem: $tool,
                originalX: $tool.position().left,
                originalY: $tool.position().top,
                config: toolsetConfig[$tool.attr('id')]
            }
        })
        .on('mouseup', function (e) {
            console.log('mouseup')
            mouseDown = false;
            var droppedX = $currentTool.elem.position().left
                , droppedY = $currentTool.elem.position().top
                , offsetHeight = $('.toolset').height();
            if (droppedY > offsetHeight && (droppedY < offsetHeight + 400)) {
                addFieldToForm($currentTool.config)
            }
            $currentTool.elem.css({ left: $currentTool.originalX, top: $currentTool.originalY })
        })
    $('.form-container').on('mousemove', function (e) {
        if (!!mouseDown) {
            $currentTool.elem.css({ left: e.pageX, top: e.pageY })
            $
        }
    })
})

function addFieldToForm(fieldConfig) {
    $("#empty-msg").hide()
    var result = ''
    var fieldName = 'name'
    var fieldType = 'text'
    switch (fieldConfig.config.type) {
        case TEXT_BOX:
            result = contructFormField(fieldName, 'text')
            break;
        case CHECK_BOX:
            result = contructCheckbox(fieldName)
            break;
        case DROP_DOWN:
            result = constructDropdown(fieldConfig.config.options)
            break;
        case TEXT_AREA:
            result = esult = contructTextarea(fieldName)
            break;
    }
    $("#dynamic-form").append(result);
}
