# allProducts contains all the prodcuts that we initially wish to display
from voices.models import *

allProducts = [ # [product's name, image source, type]
['Onions', '../../static/image/onion.jpeg', 'produce'],
['Cabbage', '../../static/image/cabbage.jpeg', 'produce'],
['Tomatos', '../../static/image/tomato.jpeg', 'produce'],
['Potatos', '../../static/image/potato.jpeg', 'produce'],
['Carrots', '../../static/image/carrot.jpeg', 'produce'],
['Broccoli', '../../static/image/broccoli.jpeg', 'produce'],
['Asparagus', '../../static/image/asparagus.jpeg', 'produce'],
['Lettuce', '../../static/image/lettuce.jpeg', 'produce'],
['Strawberries', '../../static/image/strawberry.jpeg', 'produce'],
['Oranges', '../../static/image/orange.jpeg', 'produce'],
['Watermelon', '../../static/image/watermelon.jpeg', 'produce'],
['Onions', '../../static/image/onion.jpeg', 'produce'],

['Corn', '../../static/image/cancorn.jpeg', 'canned'],
['Green Beans', '../../static/image/cangreenbean.jpeg', 'canned'],
['Tuna', '../../static/image/cantuna.jpeg', 'canned'],
['Spam', '../../static/image/spam.jpeg', 'canned'],
['Tomato Soup', '../../static/image/tomatosoup.jpeg', 'canned'],
['Chicken Noodle Soup', '../../static/image/chickennoodlesoup.jpeg', 'canned'],
['Mushroom Soup', '../../static/image/mushroomsoup.jpeg', 'canned'],
['Vegetable Beef Soup', '../../static/image/vegetablebeefsoup.jpeg', 'canned'],

['Multigrain Cereal', '../../static/image/multigraincereal.jpeg', 'boxed'],
['Macaroni & Cheese', '../../static/image/mac&cheese.jpeg', 'boxed'],
['Minute White Rice', '../../static/image/minuterice.jpeg', 'boxed'],
['Savory Chicken Meal', '../../static/image/savorychicken.jpeg', 'boxed'],

['White Rice', '../../static/image/whiterice.jpeg', 'grainsBeans'],
['Brown Rice', '../../static/image/brownrice.jpeg', 'grainsBeans'],
['Couscous', '../../static/image/couscous.jpeg', 'grainsBeans'],
['Quinoa', '../../static/image/quinoa.jpeg', 'grainsBeans'],
['Lentils', '../../static/image/lentil.jpeg', 'grainsBeans'],
['Pinto Beans', '../../static/image/pintobean.jpeg', 'grainsBeans'],
['Black Beans', '../../static/image/blackbean.jpeg', 'grainsBeans'],
['Red Kidney Beans', '../../static/image/kidneybean.jpeg', 'grainsBeans'],

['Toothpaste', '../../static/image/toothpaste.jpeg', 'household'],
['Toilet Paper', '../../static/image/toiletpaper.jpeg', 'household'],
['Shampoo', '../../static/image/shampoo.jpeg', 'household'],
['Soap', '../../static/image/soap.jpeg', 'household'],
['Laundry Detergent', '../../static/image/laundrydetergent.jpeg', 'household'],
['Dish Soap', '../../static/image/dishsoap.jpeg', 'household'],
['Towels', '../../static/image/towel.jpeg', 'household'],
['Broom & Dustpan', '../../static/image/broomanddustpan.jpeg', 'household'],

['Socks', '../../static/image/sock.jpeg', 'clothing'],
['Unisex Underwear', '../../static/image/underwear.jpeg', 'clothing'],
['Coat', '../../static/image/coat.jpeg', 'clothing'],
['Pants', '../../static/image/pants.jpeg', 'clothing']

]

for prod in allProducts:
    temp = Products(prodName=prod[0], prodImg=prod[1], prodType=prod[2])
    temp.save()
