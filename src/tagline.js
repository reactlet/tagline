/** @jsx React.DOM */

// Tagline component
var Tagline = React.createClass({
    name: 'tagline',
    mixins: [getCommonMixin],
    
    // attribute definitions
    getAttributes: function() {
        var attributes = [
            { name:'boxClass', type:'string', required:false, defaultValue:'', note:'container CSS class' },
            { name:'items', type:'Array', required:false, defaultValue:[], note:'tag items' }
        ];
        return attributes;
    },
    
    onClick: function(event) {
        var target = $(event.target);
        if (target.hasClass('tag-close-icon')) {
            this.onTagClick(event);
        }
    },
    
    onTagClick: function(event) {
        var tagId = $(event.target).attr('data-id');
        // remove item with text equal to clicked tag's text
        var newItems = [];
        for (var i = 0; i < this.state.items.length; i++) {
            var item = this.state.items[i];
            if (item.id !== tagId) {
                newItems.push(item);
            }
        }
        this.state.items = newItems;
        // update display
        this.forceUpdate();
    },
    
    addTags: function(tags) {
        if (typeof tags === 'string') {
            tags = [tags]
        }
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (tag) {
                this.state.items.push({ text:tag });
            }
        }
        // update display
        this.forceUpdate();
    },
    
    // populate id field if not present
    normalizeItems: function(items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!item.id) {
                item.id = this.generateUid();
            }
        }
    },
    
    render: function() {
        // set content display
        var tagElements = [];
        // normalize items
        this.normalizeItems(this.state.items);
        for (var i = 0; i < this.state.items.length; i++) {
            var tag = this.state.items[i];
            var tagKey = 'tag-item-' + tag.id;
            tagElements.push(
                <Tag data={ tag } key={ tagKey } />
            );
        }
        return (
            <div className={ this.state.containerClassNames.join(' ') }
                onClick={ this.onClick }
                >
                { tagElements }
                <div className="div-clear-both"></div>
            </div>
        );
    }
});

// Tag component
var Tag = React.createClass({
    name: 'tag',
    mixins: [getCommonMixin],
    
    // attribute definitions
    getAttributes: function() {
        var attributes = [
            { name:'boxClass', type:'string', required:false, defaultValue:'', note:'container CSS class' },
            { name:'id', type:'string', required:false, defaultValue:'', note:'tag id' },
            { name:'text', type:'string', required:false, defaultValue:'', note:'tag text' }
        ];
        return attributes;
    },
    
    render: function() {
        // set content display
        var content =
            <div className="tag-content-container" >
                <span className="tag-text-container">{ this.state.text }</span>
                <span className="tag-icon-container">
                    <i className="tag-close-icon fa fa-close" data-id={ this.state.id }></i>
                </span>
            </div>;
        return (
            <div className={ this.state.containerClassNames.join(' ') } >
                { content }
            </div>
        );
    }
});