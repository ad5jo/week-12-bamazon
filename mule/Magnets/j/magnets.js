/*
-----------------------------------------------
Daniel Bulli
http://www.nuff-respec.com/technology/javascript-and-css-magnets
----------------------------------------------- */

var Magnet =
{
	init: function()
	{
		zmagnet = 1;
		this.magnet_ps = $$('p.magnets');
		this.make_magnets();
	},

	make_magnets: function()
	{
		//go thru each paragraph
		this.magnet_ps.each(function(paragraph)
			{
				this.create_magnet(paragraph)
			},this);
	},

	create_magnet: function(paragraph)
	{
		//grab text of paragraph
		var txt = paragraph.getText();

		//consider a word to be a space
		var txt_arry = txt.split(' ');

		//create a new paragraph
		var new_paragraph = new Element('p', { 'class': 'magnetic' });

		//go thru each paragraph
		txt_arry.each(function(word)
			{
				this.add_word(word,new_paragraph)
			},this);

		//replace old paragraph with new one
		new_paragraph.replaces(paragraph);

	},

	add_word: function(word,new_paragraph)
	{
		//create new anchor tag with class magnet
		var my_anchor = new Element('a', {
			'href': '#',
			'class': 'magnet',
			'events': {
				'click': function(el){
					return false;
				}
			}
		});

		this.make_draggable(my_anchor);

		//create new span with word
		var my_span = new Element('span',{
			'html': word
		});

		//inject anchor inside span
		my_span.inject(my_anchor);

		//inject anchor inside of p
		my_anchor.inject(new_paragraph);
	},


	make_draggable: function(this_anchor)
	{
		//make anchor draggable
		var myDrag = new Drag(this_anchor,
		{
			onBeforeStart: function(el)
			{
				//when move make it the highest
				el.setStyle('z-index', zmagnet++);
			}
		});
	}


}

window.addEvent('domready', Magnet.init.bind(Magnet));