!function(n,i,o){var t=location.origin.replace(/^http/,"ws"),a=new WebSocket(t);a.onmessage=function(n){console.log(n),console.log(n.data)};var e=function(){i(".gameboard g").on("click",function(){i(this).off("click");var n=i(this).attr("id")[0],o=i(this).attr("id")[1];a.send({row:n,col:o})})};n.init=function(){e()}}(window.Gameplay=window.Gameplay||{},jQuery),function(n,i,o){var t=(i("body"),function(){});n.init=function(){t()}}(window.Messages=window.Messages||{},jQuery),function(){Gameplay.init(),Messages.init()}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdhbWVwbGF5LmpzIiwiTWVzc2FnZXMuanMiLCJpbml0LmpzIl0sIm5hbWVzIjpbIkdhbWVwbGF5IiwiJCIsInVuZGVmaW5lZCIsImhvc3QiLCJsb2NhdGlvbiIsIm9yaWdpbiIsInJlcGxhY2UiLCJ3cyIsIldlYlNvY2tldCIsIm9ubWVzc2FnZSIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJiaW5kVUlBY3Rpb25zIiwib24iLCJ0aGlzIiwib2ZmIiwicm93IiwiYXR0ciIsImNvbCIsInNlbmQiLCJpbml0Iiwid2luZG93IiwialF1ZXJ5IiwiTWVzc2FnZXMiXSwibWFwcGluZ3MiOiJDQUFBLFNBQUFBLEVBQUFDLEVBQUFDLEdBSUEsR0FBQUMsR0FBQUMsU0FBQUMsT0FBQUMsUUFBQSxRQUFBLE1BQ0FDLEVBQUEsR0FBQUMsV0FBQUwsRUFDQUksR0FBQUUsVUFBQSxTQUFBQyxHQUNBQyxRQUFBQyxJQUFBRixHQUNBQyxRQUFBQyxJQUFBRixFQUFBRyxNQU1BLElBQUFDLEdBQUEsV0FDQWIsRUFBQSxnQkFBQWMsR0FBQSxRQUFBLFdBQ0FkLEVBQUFlLE1BQUFDLElBQUEsUUFDQSxJQUFBQyxHQUFBakIsRUFBQWUsTUFBQUcsS0FBQSxNQUFBLEdBQ0FDLEVBQUFuQixFQUFBZSxNQUFBRyxLQUFBLE1BQUEsRUFDQVosR0FBQWMsTUFBQUgsSUFBQUEsRUFBQUUsSUFBQUEsTUFjQXBCLEdBQUFzQixLQUFBLFdBQ0FSLE1BR0FTLE9BQUF2QixTQUFBdUIsT0FBQXZCLGFBQUF3QixRQ3JDQSxTQUFBQyxFQUFBeEIsRUFBQUMsR0FHQSxHQUdBWSxJQUhBYixFQUFBLFFBR0EsYUFPQXdCLEdBQUFILEtBQUEsV0FDQVIsTUFHQVMsT0FBQUUsU0FBQUYsT0FBQUUsYUFBQUQsUUNqQkEsV0FFQXhCLFNBQUFzQixPQUNBRyxTQUFBSCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKEdhbWVwbGF5LCAkLCB1bmRlZmluZWQpIHtcblxuICAvLyBQcml2YXRlXG5cbiAgdmFyIGhvc3QgPSBsb2NhdGlvbi5vcmlnaW4ucmVwbGFjZSgvXmh0dHAvLCAnd3MnKTtcbiAgdmFyIHdzID0gbmV3IFdlYlNvY2tldChob3N0KTtcbiAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LmRhdGEpO1xuICAgIC8vICQoJy5nYW1lYm9hcmQgZyMnKyBldmVudC5kYXRhLnJvdyArIGV2ZW50LmRhdGEuY29sKS5maW5kKCd1c2UnKVswXS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgJyNwbGF5ZXItdG9rZW4tJyArIGV2ZW50LmRhdGEudG9rZW4pO1xuICAgIC8vICQoJy5nYW1lYm9hcmQgZycpLm9mZignY2xpY2snKTtcbiAgICAvLyAkKCc8ZGl2IC8+Jywge3RleHQ6IHRva2VuICsgJyB3aW5zIScsICdjbGFzcyc6ICd3aW5uZXItd2lubmVyLXdoYXRzLWZvci1kaW5uZXInfSkucHJlcGVuZFRvKCcuZ2FtZWJvYXJkJyk7XG4gIH07XG5cbiAgdmFyIGJpbmRVSUFjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAkKCcuZ2FtZWJvYXJkIGcnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykub2ZmKCdjbGljaycpO1xuICAgICAgdmFyIHJvdyA9ICQodGhpcykuYXR0cignaWQnKVswXTtcbiAgICAgIHZhciBjb2wgPSAkKHRoaXMpLmF0dHIoJ2lkJylbMV07XG4gICAgICB3cy5zZW5kKHsncm93Jzogcm93LCAnY29sJzogY29sfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gd3Mub24oJ3R1cm5GaW5pc2gnLCBmdW5jdGlvbihkYXRhKSB7XG4gIC8vICAgJCgnLmdhbWVib2FyZCBnIycrIGRhdGEucm93ICsgZGF0YS5jb2wpLmZpbmQoJ3VzZScpWzBdLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ3hsaW5rOmhyZWYnLCAnI3BsYXllci10b2tlbi0nICsgZGF0YS50b2tlbik7XG4gIC8vIH0pO1xuXG4gIC8vIHdzLm9uKCd3aW5uZXInLCBmdW5jdGlvbih0b2tlbikge1xuICAvLyAgICQoJy5nYW1lYm9hcmQgZycpLm9mZignY2xpY2snKTtcbiAgLy8gICAkKCc8ZGl2IC8+Jywge3RleHQ6IHRva2VuICsgJyB3aW5zIScsICdjbGFzcyc6ICd3aW5uZXItd2lubmVyLXdoYXRzLWZvci1kaW5uZXInfSkucHJlcGVuZFRvKCcuZ2FtZWJvYXJkJyk7XG4gIC8vIH0pO1xuXG4gIC8vIFB1YmxpY1xuICBHYW1lcGxheS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgYmluZFVJQWN0aW9ucygpO1xuICB9O1xuXG59KHdpbmRvdy5HYW1lcGxheSA9IHdpbmRvdy5HYW1lcGxheSB8fCB7fSwgalF1ZXJ5KSk7XG4iLCIoZnVuY3Rpb24oTWVzc2FnZXMsICQsIHVuZGVmaW5lZCkge1xuXG4gIC8vIFByaXZhdGVcbiAgdmFyICRib2R5ID0gJCgnYm9keScpO1xuXG5cbiAgdmFyIGJpbmRVSUFjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAkYm9keS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAvLyAgICRib2R5LmhpZGUoKTtcbiAgICAvLyB9KTtcbiAgfTtcblxuICAvLyBQdWJsaWNcbiAgTWVzc2FnZXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGJpbmRVSUFjdGlvbnMoKTtcbiAgfTtcblxufSh3aW5kb3cuTWVzc2FnZXMgPSB3aW5kb3cuTWVzc2FnZXMgfHwge30sIGpRdWVyeSkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gIEdhbWVwbGF5LmluaXQoKTtcbiAgTWVzc2FnZXMuaW5pdCgpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9