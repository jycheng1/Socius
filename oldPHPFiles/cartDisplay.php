<?PHP
// Displays the elements in the cart
echo '<h2>Requests</h2><ul class="cd-cart-items">';
while(list($idx, $reqItem) = each($_SESSION['cart'])){
  echo '<li><span class="cd-qty"></span>'.$reqItem<br>.'<div class="cd-price"><form action="#">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" id="sample3">
    <label class="mdl-textfield__label" for="sample3">Why was the item requested?</label>
    </div>
    <a href="#0" class="cd-item-remove cd-img-replace">Remove</a>
    </form>
    </div>
    </li>';
}
?>
