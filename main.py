import eel
from mid import *

# ENTRYPOINT
if __name__ == '__main__':

    eel.init('front')
    eel.start('index.html', mode='chrome', size=(800, 600))
