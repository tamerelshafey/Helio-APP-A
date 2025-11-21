import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '@helio/shared-logic';
import { useAuth } from '@helio/shared-logic';
import type { PostCategory, Circle } from '@helio/shared-logic';
import { 
    PlusIcon, ChatBubbleOvalLeftEllipsisIcon, UsersIcon, TrashIcon, 
    ShoppingBagIcon, BriefcaseIcon, ArchiveBoxIcon
} from '../components/common/Icons';
import Modal from '../components/common/Modal';
import PageBanner from '../components/common/PageBanner';
import { useCommunity } from '@helio/shared-logic';
import { useNews } from '@helio/shared-logic';
import AdSlider from '../components/common/AdSlider';
import { InputField, TextareaField } from '../components/common/FormControls';
import ImageUploader from '../components/common/ImageUploader';

// Import newly created tab components
import CommunityFeedTab from '../components/community/CommunityFeedTab';
import MarketplaceTab from '../components/community/MarketplaceTab';
import JobsTab from '../components/community/JobsTab';
import LostAndFoundTab from '../components/community/LostAndFoundTab';

// --- FORMS (kept here as they are opened from this page's context) ---

const NewPostForm: React.FC<{ onClose: () => void; circleId: number }> = ({ onClose, circleId }) => {
    const { addPost } = useCommunity();
    const [category, setCategory] = useState<PostCategory>('نقاش');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);

    const handlePollOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => setPollOptions([...pollOptions, '']);
    const removePollOption = (index: number) => setPollOptions(pollOptions.filter((_, i) => i !== index));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && category !== 'استطلاع رأي') return;
        
        let postData: any = { category, title: title.trim() || undefined, content, circleId };
        
        if (category === 'استطلاع رأي') {
            const validOptions = pollOptions.map(opt => ({ option: opt.trim(), votes: [] })).filter(opt => opt.option);
            if (validOptions.length < 2) {
                alert('يجب أن يحتوي الاستطلاع على خيارين على الأقل.');
                return;
            }
            postData.pollOptions = validOptions;
        }

        addPost(postData);
        onClose();
    };

    const postCategories: PostCategory[] = ['نقاش', 'سؤال', 'حدث', 'استطلاع رأي'];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">نوع المنشور</label>
                <select value={category} onChange={e => setCategory(e.target.value as PostCategory)} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2">
                    {postCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">{category === 'استطلاع رأي' ? 'السؤال الرئيسي للاستطلاع' : 'العنوان (اختياري)'}</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={category === 'استطلاع رأي' ? 'ما هو سؤالك؟' : 'مثال: تجمع ملاك الحي الأول'} required={category === 'استطلاع رأي'} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">المحتوى</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} required rows={4} placeholder="اكتب ما يدور في ذهنك..." className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2"></textarea>
            </div>
            
            {category === 'استطلاع رأي' && (
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium">خيارات الاستطلاع</label>
                    {pollOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="text" value={option} onChange={e => handlePollOptionChange(index, e.target.value)} placeholder={`خيار ${index + 1}`} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2" />
                            {pollOptions.length > 2 && <button type="button" onClick={() => removePollOption(index)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4"/></button>}
                        </div>
                    ))}
                    <button type="button" onClick={addPollOption} className="text-sm text-cyan-600 font-semibold flex items-center gap-1"><PlusIcon className="w-4 h-4"/>إضافة خيار</button>
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">نشر</button>
            </div>
        </form>
    );
};

const AddItemForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handleSaveMarketplaceItem } = useCommunity();
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', category: '', contactPhone: '', duration: 30,
    });
    const [images, setImages] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            alert('يرجى إضافة صورة واحدة على الأقل.');
            return;
        }
        handleSaveMarketplaceItem({
            ...formData,
            price: parseFloat(formData.price) || 0,
            images,
            duration: Number(formData.duration),
        });
        onClose();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUploader initialImages={images} onImagesChange={setImages} multiple maxFiles={5} label="صور المنتج" />
            <InputField name="title" label="عنوان الإعلان" value={formData.title} onChange={handleChange} required />
            <TextareaField name="description" label="الوصف" value={formData.description} onChange={handleChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField name="price" label="السعر (بالجنيه)" type="number" value={formData.price} onChange={handleChange} required />
                <InputField name="category" label="الفئة" value={formData.category} onChange={handleChange} required placeholder="مثال: أثاث, إلكترونيات..."/>
            </div>
            <InputField name="contactPhone" label="رقم هاتف للتواصل" value={formData.contactPhone} onChange={handleChange} required />
            <div>
                <label className="block text-sm font-medium mb-1">مدة عرض الإعلان</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md">
                    <option value={30}>30 يوم</option>
                    <option value={60}>60 يوم</option>
                    <option value={90}>90 يوم</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-600 rounded-md">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">إرسال للمراجعة</button>
            </div>
        </form>
    );
};

const AddJobForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handleSaveJobPosting } = useCommunity();
    const [formData, setFormData] = useState({
        title: '', companyName: '', description: '', location: 'هليوبوليس الجديدة',
        type: 'دوام كامل' as 'دوام كامل' | 'دوام جزئي' | 'عقد' | 'تدريب', contactInfo: '', duration: 30,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSaveJobPosting({
            ...formData,
            type: formData.type as any,
            duration: Number(formData.duration),
        });
        onClose();
    };
    