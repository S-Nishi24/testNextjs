import "dotenv/config"; // `.env.local` の環境変数を読み込む
import fetch from "node-fetch"; // Node.js で fetch を使うために必要

//1.全データ取得
const fetchAllUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;
    console.log("リクエストURL:", url); // **ここでURLが正しいか確認**
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTPエラー！ステータス: ${response.status}`);
    }

    const data = await response.json();
    console.log("①取得したユーザー一覧:", data);
};

// 関数を実行
fetchAllUsers();

//2.選択したカラムのみ取得
const fetchSelectedColumns = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username`, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log("②選択したカラムのみ:", data);
};

//関数を実行
fetchSelectedColumns();

//3.指定した値に適合するデータを取得
const fetchUserByName = async (username) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?username=eq.${username}&select=id,username`, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(`③ユーザー名「${username}」のデータ:`, data);
};

//関数を実行
fetchUserByName("田中太郎");

//4.作成が新しい順に取得（降順：desc・昇順：asc）
const fetchSortedUsers = async (order = "desc") => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username,created_at&order=created_at.${order}`, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(`④作成日時降順（${order}）のユーザー一覧:`, data);
};

//関数を実行
fetchSortedUsers("desc"); // 降順