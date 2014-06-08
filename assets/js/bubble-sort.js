BubbleSort.UNSORTED_COLOR = "#85BAB0";
BubbleSort.PROCESSED_COLOR = "#F4D569";
BubbleSort.SORTED_COLOR = "#ED1941";
BubbleSort.STROKE_COLOR = "#424651";
BubbleSort.FRAME_DURATION = 600;

function BubbleSort(width, height, id){
    this.width = width;
    this.height = height;

    this.animation = d3.select(id).transition();

    this.svg = d3.select(id).append("svg");
    this.svg.attr("height", this.height).attr("width", this.width);

    this.currentFrame = 0;

    this.data = [];
      for(var j = 0; j < 10; j++) {
          this.data[j] = {};
          this.data[j].val = j+1;
          this.data[j].id = "rect" + j;
      }
    this._permuteData()
    this._showData(id);

    this.frames = [];
    this._addAnimationFrame(function(){
        return d3.select(id).transition();
    });

    this.performSort();

    this.running = false;
}

BubbleSort.prototype.randomNumbers = function(n, min, max) {
  var values = [], i = max;
  while(i >= min) values.push(i--);
    var results = [];
    var maxIndex = max;
    for(i = 1; i <= n; i++){
        maxIndex--;
        var index = Math.floor(maxIndex * Math.random());
        results.push(values[index]);
        values[index] = values[maxIndex];
      }
  return results;
}

BubbleSort.prototype.start = function(){
  d3.select("#start").attr("disabled", "true");
  d3.select("#reset").attr("disabled", "true");
  d3.select("#stop").attr("disabled", null);
  this.running = true;

  this.frames[this.currentFrame](this.currentFrame);
}

BubbleSort.prototype.stop = function(){
  d3.select("#start").attr("disabled", null);
  d3.select("#stop").attr("disabled", true);
  d3.select("#reset").attr("disabled", null);
  this.running = false;
}

BubbleSort.prototype.reset = function(){
  if(!this.running){
      this.currentFrame = 0;
      this.frames = [];
      this._permuteData();
      this._showData();
      this.performSort()
  }
  this.running = false;
}

BubbleSort.prototype._showData = function() {

  d3.selectAll("rect").remove();
  for(j = 0; j < this.data.length; j++) {
    this.data[j].rect = this.svg.append("rect")
      .attr("id", this.data[j].id)
      .attr("height", 30)
      .attr("fill", BubbleSort.UNSORTED_COLOR)
      .attr("stroke", BubbleSort.STROKE_COLOR)
      .attr("width", this.data[j].val*23)
      .attr("x", 0)
      .attr("y", j*40)
    }
}

BubbleSort.prototype._addAnimationFrame = function(frame){
    var vis = this;
    this.frames.push(function() {
        frame().each("end", function(index){
            if(index != vis.frames.length && vis.running){
                vis.frames[index](index);
                return;
            }
            vis.stop();
            return;
        }.bind(this, ++vis.currentFrame));

    });
}

BubbleSort.prototype.performSort = function(){
    for (var i = 0; i < this.data.length - 1; i++) {
        for (var j = 0; j < this.data.length - i - 1; j++) {
            if(this.data[j].val < this.data[j+1].val){
                this._addSwapFrame(j, this.data[j].id, this.data[j + 1].id);

                var tmp = this.data[j];
                this.data[j] = this.data[j+1];
                this.data[j+1] = tmp;
            } else {
                this._addComparisonFrame(this.data[j].id, this.data[j + 1].id);
            }
        }

        this._addSortedFrame(i);

    }
}


BubbleSort.prototype._addSortedFrame = function(i) {
    this._addAnimationFrame(function(){
        if(i == (this.data.length - 2)){
            d3.select("#rect" + (i+1)).attr("fill", BubbleSort.SORTED_COLOR);
        }
        d3.select("#rect" + i).attr("fill", BubbleSort.SORTED_COLOR);
        return d3.select("#rect" + i).transition().duration(0);

    }.bind(this, i));
}

BubbleSort.prototype._addComparisonFrame = function(id1, id2) {
    this._addAnimationFrame(function(){
        d3.select("#" + id1).attr("fill", BubbleSort.PROCESSED_COLOR);
        d3.select("#" + id2).attr("fill", BubbleSort.PROCESSED_COLOR);

        d3.select("#" + id1).transition().duration(BubbleSort.FRAME_DURATION).each("end", function(){
            d3.select("#" + id1).attr("fill", BubbleSort.UNSORTED_COLOR);
            d3.select("#" + id2).attr("fill", BubbleSort.UNSORTED_COLOR);
        });
        return d3.select("#" + id2).transition().duration(BubbleSort.FRAME_DURATION);

    });
}


BubbleSort.prototype._addSwapFrame = function(j, id1, id2) {
    this._addAnimationFrame(function(){

        d3.select("#" + id1).attr("fill", BubbleSort.PROCESSED_COLOR);
        d3.select("#" + id2).attr("fill", BubbleSort.PROCESSED_COLOR);

        d3.select("#" + id1).transition().duration(BubbleSort.FRAME_DURATION).attr("y", (j+1)*40).each("end", function(){
            d3.select("#" + id1).attr("fill", BubbleSort.UNSORTED_COLOR);
            d3.select("#" + id2).attr("fill", BubbleSort.UNSORTED_COLOR);
        });
        return d3.select("#" + id2).transition().duration(BubbleSort.FRAME_DURATION).attr("y", j*40);

    });
}

BubbleSort.prototype._permuteData = function() {
    for (var i = this.data.length - 1; i > 0; i--) {
        var index = Math.floor(Math.random() * i);
        //swap
        var tmp = this.data[index];
        this.data[index] = this.data[i];
        this.data[i] = tmp;
    }
}

var vis = new BubbleSort(250, 400, "#canvas");
