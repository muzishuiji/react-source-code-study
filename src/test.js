// // sum tree
// struct Tree {
//     int mPayload;
//     vector<Tree> mChildren;
// };

// // 广度优先遍历
// template<class T>
// T reduceTree(
//     function<void(T&, T)> f,
//     T init, const Tree&t)
// {
//     T res = init;
//     f(res, t.mPayload);
//     for(const Tree& s: t.mChildren) {
//         f(res, reduceTree(f, init, s));
//     }
//     return res;
// }

// int sumTree(const Tree& t) {
//     return reduceTree<int> (
//         [](int& x, int y) {
//             x += y;
//         },
//         0,
//     t);
// }

// int64_t sum(const vector<int>& xs) {
//     return reduce<int>(
//         [](int& x,int y) {
//             x += y;
//         },
//         0,
//         xs
//     )
// }

// // sumTree和sum内部传递的东西都是一样的，那么可以将这部分抽象出来
// auto add = [](int& x, int y) {
//     x += y;
// };
// auto sum = bind(&reduce<int>, add, 0, _1);
// auto sumTree = bind(&reduceTree<int>, add, 0, _1);
// // 求导数和牛顿-拉夫迭代算法都有相同的结构，总体而言，就是有一个循环迭代
// // 另外循环的中终止条件是由误差决定的，两者的差别就是循环结构主体的差别

// // within1函数
// // 状态转移函数：负责将当前这个状态变成下一个状态
// // 表观函数：状态转移函数负责将当前这个状态变成下一个状态
// double within1(
//     double eps,
//     function<double (double)> appearance,
//     function<double (double)> transition
// ) {
//     double curState = 1.0;
//     docuble curValue = appearance(curState);
//     for(;;) {
//         double nextState = transition(curState);
//         double nextValue = appearance(nextState);
//         if(fabs(nextValue - curValue) < eps) break;
//         curState = nextState;
//         curValue = nextValue;
//     }
//     return curValue;
// }

// // lazy sequence就是一个有状态但无参数的函数，每次调用都会返回当前的状态
// // 并将自己的状态迁移到下一个，下裂代码中使用了值捕获，产生了一个内部状态
// // 并且加上mutable使得内部状态可以被改变
// // 将牛顿-拉弗森迭代视作一个无限长的序列，再截断不需要的尾巴
// auto iterate = [](function<double(double)> f, double init) {
//     double an = init;
//     return [=]() mutable {
//         double x = an;
//         an = f(an);
//         return x;
//     }
// }

// auto seq = iterate([](double x) { return x*2;}, 1);
// // 每次迭代都会取一个值，当前一个值和后一个值的误差足够之后结束
// auto within2 = [](function<double()> seq, double eps) {
//     double last = seq();
//     for(;;) {
//         double cur = seq();
//         if(fabs(cur - last) < eps) break;
//         last = cur; 
//     }
//     return last;
// }

// auto sqrt2 = [=](double x, double eps) {
//     auto next = [=](double an) {
//         return nextNewtonRaphson(x, an);
//     }
//     auto seq = iterate(next, 1.0);
//     return within2(seq, rps);
// }

// // 高阶函数：函数可以作为参数，也可以作为返回值
// // lazy sequence：逻辑上的无限长序列，视线中是一个有状态无参数的函数
// // 新的胶水，函数式编程提供了新的建模思路，新的胶水代码的方法。胶水不同，分解问题的方式也不同
// // 没有银弹，如果手中只有锤子，看什么都像钉子，学习函数式编程 是为了丰富你的武器库，不要为了函数式而函数式