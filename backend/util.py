from copy import deepcopy


class Board :
    def __init__(self) :
        self.Board = [[0,0,0,0] for _ in range(4)]
        self.player_id = 1

    def set_Board(self, pos1, pos2, player_id) :
        self.Board[pos1][pos2] = player_id
    def get_Board(self, pos1, pos2) :
        if isinstance(pos1, str) :
            return self.Board[ord(pos1) - ord('A')][pos2 - 1]
        return self.Board[pos1][pos2]
    
    def change_player_id(self) :
        self.player_id = 3 - self.player_id
    def get_player_id(self) :
        return self.player_id
    
    def wincheck(self) : #################### return winner id when win, if not, return False
        draw = True
        for i in range(4) :
            if((self.Board[i][0] == self.Board[i][1] == self.Board[i][2] == self.Board[i][3]) 
               and self.Board[i][0] != 0) :
                return self.Board[i][0]
            if((self.Board[0][i] == self.Board[1][i] == self.Board[2][i] == self.Board[3][i]) 
               and self.Board[3][i] != 0) :
                return self.Board[3][i]
            for j in range(4) :
                if(self.Board[i][j] == 0) :
                    draw = False
        
        if((self.Board[0][0] == self.Board[1][1] == self.Board[2][2] == self.Board[3][3]) 
            and self.Board[3][3] != 0) :
            return self.Board[0][0]
        if((self.Board[0][3] == self.Board[1][2] == self.Board[2][1] == self.Board[3][0]) 
            and self.Board[3][0] != 0) :
            return self.Board[3][0]
        return 4 if draw else 0
    
    def Button(self) :
        copied = deepcopy(self.Board)
        self.Board = [[copied[0][1], copied[0][2], copied[0][3], copied[1][3]],
                     [copied[0][0], copied[1][2], copied[2][2], copied[2][3]], 
                     [copied[1][0], copied[1][1], copied[2][1], copied[3][3]], 
                     [copied[2][0], copied[3][0], copied[3][1], copied[3][2]]] 
