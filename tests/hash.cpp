#include <iostream>
using namespace std;

struct MucTu{
    string tuTiengAnh, nghiaTiengViet;

    MucTu(string tuTA = "", string nghiaTV = ""){
        tuTiengAnh = tuTA;
        nghiaTiengViet = nghiaTV;
    }
};

class TuDien{
    private:
        MucTu *table;
        bool * trong;
        int tableSize;
    public:
        TuDien(int size = 101){
            tableSize = size;
            table = new MucTu[tableSize];
            trong = new bool[tableSize];

            for (int i = 0; i < tableSize; i++){
                trong[i] = true;
            }
        }
        ~TuDien(){
            delete[] table;
            delete[] trong;
        }

        int hash(string tuTiengAnh){
            int sum = 0;
            for (char c : tuTiengAnh){
                sum += (int)c;
            } return sum % tableSize;
        }
        
};

int main(){
    
    return 0;

}