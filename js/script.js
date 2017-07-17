$(document).ready

// 10-elements string
$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
  return str;
  }   
  
  // Column Class
  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // creating a column
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
      
      // events:
      $columnDelete.click(function() {
        self.removeColumn();
      });
      
      $columnAddCard.click(function(event) {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });
      
      // Konstruowanie elementów kolumn
      $column.append($columnTitle)
             .append($columnDelete)
             .append($columnAddCard)
             .append($columnCardList);

    return $column;
    }
  }
    
  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    } 
  };
  
  // Klasa Card
  function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard(); //

    function createCard() {
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');
    
      $cardDelete.click(function(){
        self.removeCard();
      });
    
      $card.append($cardDelete)
       .append($cardDescription);
    return $card;
    }
  }
  
  // removing cards
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };
  
  
  // Drag'n'drop
  function initSortable() {
   $('.column-card-list').sortable({
     connectWith: '.column-card-list',
     placeholder: 'card-placeholder'
   }).disableSelection();
  }
 
  $('.create-column')
    .click(function(){
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
  });
 
   // Column's creation
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // Adding columns to the board
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // Creating new cards
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  // Addinc cards to the columns
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
   
})