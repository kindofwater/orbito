from sys import stdin
from os import system
from time import sleep
from copy import deepcopy



######################### waiting recomprehension #######################

class Orbito :
    def __init__(self) :
        self.Board = Board()
    def run(self) :
        self.player_id = 1
        turn = 0
        first_try = True
        while True :
            turn += 1
            ##############################
            # moving part (consider condition)
            ##############################
            print(" ########################## Player", self.player_id, "removing phase ##########################")
            self.Disp()
            if not first_try :
                self.moving()
            else :
                print("As First try, we skip First Remove phase")
                sleep(3)
                first_try = False

            ##############################
            # Addition part (consider condition)
            ##############################
            system('cls')
            
            print(" ########################## Player", self.player_id, "Addition phase ##########################")
            self.Disp()
            self.Addition(self.player_id)


            ##############################
            # button (consider condition)
            ##############################
            system('cls')

            print(" ########################### Addition is done, ################################")
            print(" ########################### Now We push the Button. ##########################")
            self.Disp()
            sleep(3)
            self.Button()

            system('cls')
            print(" ########################## Button has pushed. ##########################")
            self.Disp()
            ##############################
            # wincheck (by if) (draw should be checked also)
            ##############################
            if(self.wincheck()) :
                print("$$$$$$$$$$$$$$$$$$$$$$$$$ Congrat! $$$$$$$$$$$$$$$$$$$$$$$$$")
                print("Player ", self.player_id, " is win!")
                return
            else :
                if(turn >= 16) :
                    print("draw. do it again.")
                    sleep(10)
                    return
                else :
                    print(" ########################## next turn ##########################")
                    sleep(3)
                    system('cls')
            self.player_id = self.player_id % 2 + 1

    def Disp(self) :
        print("     1    2    3    4")
        for i in range(4) :
            print(chr(65+i), end="")
            for j in range(4) :
                print("   ", self.Board.get_Board(i,j), end="")
            print("")
    def moving(self) :
        
        while True :
            print("Choose one that you want to move (ex. A2): ")
            try :
                old_cord1, old_cord2 = list(stdin.readline().strip())
            except ValueError :
                print("You skip removing phase.")
                sleep(3)
                return
            old_cord2 = int(old_cord2)
            if(not ((old_cord1 in ['A','B','C','D']) and (old_cord2 in [1,2,3,4]))) :
                print("Location error, try again")
                continue
            
            marble_id = self.Board.get_Board(old_cord1,old_cord2)
            enemy_id = self.player_id % 2 + 1
            if(marble_id != enemy_id) :
                print("No marbles in there, try again")
                continue
            break
        
        self.Board.set_Board(old_cord1,old_cord2,0)

        self.Addition(enemy_id)

        ###########################
        # if you want, you can check every pieces' side slot that if there is no empty slot beside them.
        # but you don't want, just make skip (like enter "Q")
        ######################################
    def Addition(self,id) :
        while True :
            print("Choose one that you want to place (ex. B3): ")
            new_cord1, new_cord2 = list(stdin.readline().strip())
            new_cord2 = int(new_cord2)
            new_enemy_id = self.Board.get_Board(new_cord1,new_cord2)

            if(not ((new_cord1 in ['A','B','C','D']) and (new_cord2 in [1,2,3,4]))) :
                print("Location error, try again")
                continue
            if(new_enemy_id) :
                print("Marbles in there, try again")
                continue
            break
        
        self.Board.set_Board(new_cord1,new_cord2,id)
    def Button(self) :
        copied = deepcopy(self.Board.Board)
        self.Board.Board = [[copied[0][1], copied[0][2], copied[0][3], copied[1][3]],
                            [copied[0][0], copied[1][2], copied[2][2], copied[2][3]], 
                            [copied[1][0], copied[1][1], copied[2][1], copied[3][3]], 
                            [copied[2][0], copied[3][0], copied[3][1], copied[3][2]]] 
        ################################################ sorry zz
    def wincheck(self) : #################### return true when game set
        for i in range(4) :
            if((self.Board.get_Board(i,0) == self.Board.get_Board(i,1) == self.Board.get_Board(i,2) == self.Board.get_Board(i,3)) 
               and self.Board.get_Board(i,3) != 0) :
                return self.Board.get_Board(3,i)
            if((self.Board.get_Board(0,i) == self.Board.get_Board(1,i) == self.Board.get_Board(2,i) == self.Board.get_Board(3,i)) 
               and self.Board.get_Board(3,i) != 0) :
                return self.Board.get_Board(3,i)
        return False

class Board :
    def __init__(self) :
        self.Board = [[0,0,0,0] for _ in range(4)]
    def set_Board(self, pos1, pos2, player_id) :
        self.Board[ord(pos1) - ord('A')][pos2 - 1] = player_id
    def get_Board(self, pos1, pos2) :
        if isinstance(pos1, str) :
            return self.Board[ord(pos1) - ord('A')][pos2 - 1]
        return self.Board[pos1][pos2]
if __name__ == "__main__" :
    game = Orbito()
    game.run()