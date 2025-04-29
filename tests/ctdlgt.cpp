#include <iostream>
using namespace std;

template <typename T>
class Vector{
    public:
        //hàm tạo
        Vector(int initCapacity = 16){
            size = 0;
            capacity = initCapacity;
            array = new T[capacity];
        }
    
        //hàm hủy
        ~Vector(){
            delete []array;
        }

        int getSize(){
            return size;
        }

        bool isEmpty() {
            return (size == 0);
        }

        //chèn vào cuối vector
        void pushBack(const T &x){
            array[size] = x;
            size++;
        }

        //vào giữa
        void insert(int pos, T x){
            if (pos < 0 || pos > size){
                cout << "error"; 
                return;
            } else {
                for (int i = size; i > pos; i--){
                    array[i] = array[i-1];
                }
                array[pos] = x;
                size++;
            }
        }

        //xóa phần tử cuối
        void popBack(){
            size--;
        }

        //ở vị trí cần xóa
        void erase(int pos){
            if(pos < 0 || pos > size){
                cout << "error";
                return;
            } else {
                for (int i = pos; i < size - 1; i++){
                    array[i] = array[i+1];
                }
                size--;
            }
        }

        void print(){
            for (int i = 0; i < size; i++){
                cout << array[i] << " ";
            }
            cout << endl;
        }

    private:
        int capacity;
        int size = 0;
        T* array;

};


template <typename T>
class SingleList{
    private:
        struct  Node
        {
            T elem;
            Node *next;
            Node (T e, Node *n){
                elem = e;
                next = n;
            }
        };
        Node *head;
        int size = 0;
    public:
        //Hàm tạo, hủy
        SingleList(){
            head = NULL;
        }
        ~SingleList(){
            while(!isEmpty){
                popFront();
            }
        }

        bool isEmpty(){
            return (head == NULL);
        }

        int getSize(){
            return size;
        }
        
        T front(){
            if(isEmpty()){
                cout << "ds rong" << endl;
            } return head->elem;
        }

        //chèn x vào đầu danh sách
        void pushFront(T x){
            head = new Node(x, head);
            size++;
        }

        //xóa phần tử ở đầu danh sách
        void popFront(){
            if(isEmpty()){
                return;
            } else {
                Node *old = head;
                head = head->next;
                delete old;
                size--;
            }
        }
        //ở cuối
        void popBack(){
            if(isEmpty()){
                return;
            }
            if(head->next == NULL){
                delete head;
                head = NULL;
            } else {
                Node *p = head;
                while (p->next != NULL && p->next->next != NULL)
                {
                    /* code */
                    p = p->next;
                } 
                delete p->next;
                p->next = NULL;
            }
            size--;
        }

        //chèn x vào cuối danh sách
        void pushBack(T x){
            Node *t = new Node(x, NULL);
            if (isEmpty()){
                head = t;
            } else {
                Node *p = head;
                while (p->next != NULL){
                    p = p->next;
                }
                p->next = t;
            }
            size++;
        }

        //xóa đi phần tử
        void remove(T x){
            Node *p1 = NULL;
            Node *p2 = head;
            while(p2 != NULL){
                if(p2->elem == x){
                    if(p1 == NULL){
                        head = head->next;
                        delete p2;
                    } else {
                        p1->next = p2->next;
                        delete p2;
                    }
                    size--;
                    break;
                }
                p1 = p2;
                p2 = p2->next;
            }
        }
};

int main(){
//     Vector<int> v;
//     v.pushBack(6);
//     v.pushBack(5);
// v.insert(1,7);
//     v.print();
//     v.print();
//     v.popBack();
//     v.print();
    
    return 0; 
}